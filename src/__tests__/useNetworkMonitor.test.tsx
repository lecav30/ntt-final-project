import { act, render } from '@testing-library/react-native';

type Listener = (payload: any) => void;
const listeners: Record<string, Listener[]> = {};
let lastSubscription: { remove: jest.Mock } | null = null;

const createMockEmitter = () => ({
  addListener: (event: string, handler: Listener) => {
    const currentListeners = listeners[event] ?? [];
    listeners[event] = currentListeners;
    currentListeners.push(handler);

    const subscription = {
      remove: jest.fn(() => {
        listeners[event] = currentListeners.filter((fn) => fn !== handler);
      }),
    };

    lastSubscription = subscription;
    return subscription;
  },

  emit: (event: string, payload: any) => {
    (listeners[event] ?? []).forEach((fn) => fn(payload));
  },
});

// const createMockEmitter = () => ({
//   addListener: (event: string, handler: Listener) => {
//     listeners[event] = listeners[event] || [];
//     listeners[event].push(handler);
//     const subscription = {
//       remove: jest.fn(() => {
//         listeners[event] = listeners[event].filter((fn) => fn !== handler);
//       }),
//     };
//     lastSubscription = subscription;
//     return subscription;
//   },
//   emit: (event: string, payload: any) => {
//     (listeners[event] || []).forEach((fn) => fn(payload));
//   },
// });

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native/jest/mock');
  const emitter = createMockEmitter();
  return {
    ...actual,
    NativeModules: { ...actual.NativeModules, NetworkMonitor: {} },
    NativeEventEmitter: jest.fn(() => emitter),
    TurboModuleRegistry: {
      getEnforcing: jest.fn(() => ({})),
      get: jest.fn(() => ({})),
    },
    __mockEmitter: emitter,
  };
});

jest.mock('../modules/network-monitor/NativeNetworkMonitor', () => ({
  __esModule: true,
  default: {
    getCurrentState: jest.fn(),
  },
}));

import { useNetworkMonitor } from '../modules/network-monitor/useNetworkMonitor';

const NativeNetworkMonitor = jest.requireMock(
  '../modules/network-monitor/NativeNetworkMonitor'
).default as {
  getCurrentState: jest.Mock;
};

const getMockEmitter = () =>
  jest.requireMock('react-native').__mockEmitter as ReturnType<
    typeof createMockEmitter
  >;

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

const TestComponent = ({ onChange }: { onChange: (info: any) => void }) => {
  const info = useNetworkMonitor();
  onChange(info);
  return null;
};

describe('useNetworkMonitor', () => {
  beforeEach(() => {
    NativeNetworkMonitor.getCurrentState.mockReset();
    Object.keys(listeners).forEach((key) => {
      listeners[key] = [];
    });
    lastSubscription = null;
  });

  it('returns the initial state and subscribes to updates', async () => {
    const initialState = {
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    };
    const nextState = {
      type: 'cellular',
      isConnected: false,
      isInternetReachable: false,
    };

    NativeNetworkMonitor.getCurrentState.mockResolvedValue(initialState);

    const onChange = jest.fn();

    const { unmount } = render(<TestComponent onChange={onChange} />);

    await act(async () => {
      await flushPromises();
    });

    expect(NativeNetworkMonitor.getCurrentState).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(initialState);

    act(() => {
      getMockEmitter().emit('networkStateChange', nextState);
    });

    expect(onChange).toHaveBeenLastCalledWith(nextState);
    unmount();
    expect(lastSubscription?.remove).not.toBeNull();
  });
});
