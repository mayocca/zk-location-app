
import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { type AppKitNetwork, sepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const queryClient = new QueryClient()

const projectId = 'cd7b004b030008983c535b848d3b4777'

// const metadata = {
//   name: 'Test Project',
//   description: 'AppKit Example',
//   url: 'https://reown.com/appkit', // origin must match your domain & subdomain
//   icons: ['https://assets.reown.com/reown-profile-pic.png']
// }

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

createAppKit({
  adapters: [wagmiAdapter],
  defaultNetwork: networks.at(0),
  networks,
  projectId,
  // metadata,
  features: {
    analytics: true
  }
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
