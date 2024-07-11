import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  // foundry
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    sepolia,
    // foundry
  ],
  ssr: true,
});