import { AppKitProvider } from "./wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppKitProvider>
      {children}
    </AppKitProvider>
  )
}
