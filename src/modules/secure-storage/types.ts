import NativeSecureStorage from './NativeSecureStorage';

export const SecureStorage = {
  setItem: async (key: string, value: string): Promise<boolean> => {
    return await NativeSecureStorage.setItem(key, value);
  },

  getItem: async (key: string): Promise<string | null> => {
    return await NativeSecureStorage.getItem(key);
  },
};

export default SecureStorage;
