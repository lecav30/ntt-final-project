import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import NetworkMonitor, { type ConnectionInfo } from './NativeNetworkMonitor';

const eventEmitter = new NativeEventEmitter(NativeModules.NetworkMonitor);

export const useNetworkMonitor = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(
    null
  );

  useEffect(() => {
    // Get initial state
    NetworkMonitor.getCurrentState().then(setConnectionInfo);

    // Subscribe to changes
    const subscription = eventEmitter.addListener(
      'networkStateChange',
      (info: any) => {
        setConnectionInfo(info as ConnectionInfo);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return connectionInfo;
};

// export default NativeNetworkMonitor;
