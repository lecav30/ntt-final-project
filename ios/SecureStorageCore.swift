import Foundation
import Security

@objcMembers
public class SecureStorageCore: NSObject {

  private let serviceName = "com.nttfinalproject.securestorage"

  @objc public func setItem(
    _ key: String,
    value: String,
    resolver resolve: @escaping (Any?) -> Void,
    rejecter reject: @escaping (String?, String?, Error?) -> Void
  ) {

    guard let data = value.data(using: .utf8) else {
      reject("STORAGE_ERROR", "Invalid string encoding", nil)
      return
    }

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: key,
      kSecValueData as String: data,
      kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
    ]

    // Delete existing item if present
    SecItemDelete(query as CFDictionary)

    let status = SecItemAdd(query as CFDictionary, nil)

    if status == errSecSuccess {
      resolve(true)
    } else {
      reject("STORAGE_ERROR", "Failed to save item: \(status)", nil)
    }
  }

  @objc public func getItem(
    _ key: String,
    resolver resolve: @escaping (Any?) -> Void,
    rejecter reject: @escaping (String?, String?, Error?) -> Void
  ) {

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: key,
      kSecReturnData as String: true,
      kSecMatchLimit as String: kSecMatchLimitOne,
    ]

    var result: AnyObject?
    let status = SecItemCopyMatching(query as CFDictionary, &result)

    if status == errSecSuccess, let data = result as? Data,
      let value = String(data: data, encoding: .utf8)
    {
      resolve(value)
    } else if status == errSecItemNotFound {
      resolve(nil)
    } else {
      reject("STORAGE_ERROR", "Failed to get item: \(status)", nil)
    }
  }
}
