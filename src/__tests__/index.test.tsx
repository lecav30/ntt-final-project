jest.mock('../modules/network-monitor', () => ({
  useNetworkMonitor: jest.fn(),
  NativeNetworkMonitor: {},
}));

import * as library from '../index';

describe('library entry point', () => {
  it('exports public API', () => {
    expect(library.ChatBox).toBeDefined();
    expect(library.Input).toBeDefined();
    expect(library.PickerComponent).toBeDefined();
    expect(library.PrimaryButton).toBeDefined();
    expect(library.SecondaryButton).toBeDefined();
    expect(library.CardSection).toBeDefined();
    expect(library.ListItem).toBeDefined();
    expect(library.ServiceItem).toBeDefined();
    expect(library.BankCard).toBeDefined();
    expect(library.useNetworkMonitor).toBeDefined();
    expect(library.SecureStorage).toBeDefined();
  });
});
