jest.mock('react-native', () => {
  const module = { multiply: jest.fn((a: number, b: number) => a * b) };
  return {
    TurboModuleRegistry: {
      getEnforcing: jest.fn(() => module),
      get: jest.fn(() => module),
    },
    __mockModule: module,
  };
});

import { TurboModuleRegistry } from 'react-native';
import NativeNttFinalProject from '../NativeNttFinalProject';

const mockModule = (jest.requireMock('react-native').__mockModule ||
  {}) as {
  multiply: jest.Mock;
};

describe('NativeNttFinalProject', () => {
  it('returns the enforcing turbo module', () => {
    expect(TurboModuleRegistry.getEnforcing).toHaveBeenCalledWith(
      'NttFinalProject'
    );
    expect(mockModule.multiply).toBeDefined();
    expect(mockModule.multiply(2, 3)).toBe(6);
    expect(NativeNttFinalProject.multiply(2, 3)).toBe(6);
  });
});
