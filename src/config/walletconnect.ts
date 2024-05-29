import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = '7490c869ade3c06adbc8aa6629dd9d02'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Gameness',
  description: 'Gameness is a platform enriched with crypto and NFT, where you can participate in tournaments, education, and events within esports.',
  url: 'https://gameness.app/', // origin must match your domain & subdomain
  icons: ['https://pbs.twimg.com/profile_images/1533794157373837314/cBiOclhW_400x400.jpg']
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet], // required
  projectId, // required
  metadata, // required
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: false, // Optional - true by default
})