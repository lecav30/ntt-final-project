import Foundation
import Network

@objcMembers public class NetworkMonitorCore: NSObject {

  private var monitor: NWPathMonitor?
  private let queue = DispatchQueue(label: "com.nttfinalproject.networkmonitor")
  private var isMonitoring = false

  // Callback to notify Objective-C side about network changes
  private var onNetworkChange: ((String, Bool, Bool) -> Void)?

  public func startMonitoring(onChange: @escaping (String, Bool, Bool) -> Void) {
    guard !isMonitoring else { return }

    self.onNetworkChange = onChange
    monitor = NWPathMonitor()

    monitor?.pathUpdateHandler = { [weak self] path in
      guard let self = self else { return }

      let isConnected = path.status == .satisfied
      let isInternetReachable = path.status == .satisfied

      // Determine connection type
      let type: String
      if path.usesInterfaceType(.wifi) {
        type = "wifi"
      } else if path.usesInterfaceType(.cellular) {
        type = "cellular"
      } else if path.usesInterfaceType(.wiredEthernet) {
        type = "ethernet"
      } else if isConnected {
        type = "unknown"
      } else {
        type = "none"
      }

      // Call back to Objective-C on main thread
      DispatchQueue.main.async {
        self.onNetworkChange?(type, isConnected, isInternetReachable)
      }
    }

    monitor?.start(queue: queue)
    isMonitoring = true
  }

  public func stopMonitoring() {
    guard isMonitoring else { return }

    monitor?.cancel()
    monitor = nil
    onNetworkChange = nil
    isMonitoring = false
  }

  public func getCurrentState(
    resolver resolve: @escaping (Any?) -> Void,
    rejecter reject: @escaping (String?, String?, Error?) -> Void
  ) {

    // Create a temporary monitor to get current state
    let tempMonitor = NWPathMonitor()
    let tempQueue = DispatchQueue(label: "com.nttfinalproject.networkmonitor.temp")

    tempMonitor.pathUpdateHandler = { path in
      let isConnected = path.status == .satisfied
      let isInternetReachable = path.status == .satisfied

      let type: String
      if path.usesInterfaceType(.wifi) {
        type = "wifi"
      } else if path.usesInterfaceType(.cellular) {
        type = "celular"
      } else if path.usesInterfaceType(.wiredEthernet) {
        type = "ethernet"
      } else if isConnected {
        type = "unknown"
      } else {
        type = "none"
      }

      let result: [String: Any] = [
        "type": type,
        "isConnected": isConnected,
        "isInternetReachable": isInternetReachable,
      ]

      resolve(result)
      tempMonitor.cancel()
    }

    tempMonitor.start(queue: tempQueue)

  }

  deinit {
    stopMonitoring()
  }
}
