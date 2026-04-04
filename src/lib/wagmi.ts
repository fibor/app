import { http, createConfig, createStorage } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

// Custom storage that can be cleared on disconnect
const noopStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
};

// Check if we've been manually disconnected
const isDisconnected = typeof window !== 'undefined' && sessionStorage.getItem('fibor-disconnected') === 'true';

export const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http('https://sepolia.base.org'),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '',
    appName: 'FIBOR Protocol',
    appDescription: 'The First International Bank of Robot',
    appUrl: 'https://fibor.xyz',
    // Disable auto-reconnect persistence — we control session via sessionStorage
    storage: createStorage({ storage: isDisconnected ? noopStorage : (typeof window !== 'undefined' ? window.localStorage : noopStorage) }),
  })
);
