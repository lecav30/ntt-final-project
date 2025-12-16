jest.mock('../modules/secure-storage/NativeSecureStorage', () => {
  return {
    __esModule: true,
    default: {
      setItem: jest.fn(),
      getItem: jest.fn(),
    },
  };
});

import { SecureStorage } from '../modules/secure-storage';

const NativeSecureStorage = jest.requireMock(
  '../modules/secure-storage/NativeSecureStorage'
).default as {
  setItem: jest.Mock;
  getItem: jest.Mock;
};

describe('SecureStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates setItem to native module', async () => {
    NativeSecureStorage.setItem.mockResolvedValue(true);

    await expect(SecureStorage.setItem('token', 'abc')).resolves.toBe(true);
    expect(NativeSecureStorage.setItem).toHaveBeenCalledWith('token', 'abc');
  });

  it('delegates getItem to native module', async () => {
    NativeSecureStorage.getItem.mockResolvedValue('stored');

    const value = await SecureStorage.getItem('token');

    expect(value).toBe('stored');
    expect(NativeSecureStorage.getItem).toHaveBeenCalledWith('token');
  });
});
