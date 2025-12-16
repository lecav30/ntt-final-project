import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(() => ({})),
  get: jest.fn(() => ({})),
}));

jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo', () => ({
  getConstants: () => ({
    Dimensions: {
      window: { width: 320, height: 640, scale: 1, fontScale: 1 },
      screen: { width: 320, height: 640, scale: 1, fontScale: 1 },
    },
  }),
}));

jest.mock('react-native/Libraries/Utilities/NativePlatformConstantsIOS', () => ({
  getConstants: () => ({
    forceTouchAvailable: false,
    interfaceIdiom: 'phone',
    isTesting: true,
    osVersion: 'test',
    systemName: 'iOS',
  }),
}));

jest.mock('react-native/Libraries/ReactNative/I18nManager', () => ({
  allowRTL: jest.fn(),
  forceRTL: jest.fn(),
  swapLeftAndRightInRTL: jest.fn(),
  getConstants: () => ({
    isRTL: false,
    doLeftAndRightSwapInRTL: false,
  }),
}));

jest.mock('react-native/Libraries/ReactNative/NativeI18nManager', () => ({
  getConstants: () => ({
    isRTL: false,
    doLeftAndRightSwapInRTL: false,
    allowRTL: false,
  }),
}));

// Basic mocks for SVG and picker so components render in Jest
jest.mock('react-native-svg', () => {
  const React = require('react');
  const Svg = (props: any) => React.createElement('Svg', props, props.children);
  const Path = (props: any) =>
    React.createElement('Path', props, props.children);

  return {
    __esModule: true,
    default: Svg,
    Path,
  };
});

jest.mock('react-native-picker-select', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: jest.fn((props) =>
      React.createElement('Picker', props, props.children)
    ),
  };
});
