import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export default function App() {
  const { open } = useAppKit();

  const { walletInfo } = useWalletInfo();
  const { address } = useAccount();

  console.log("walletInfo", walletInfo);
  console.log("address", address);
  return (
    <div>
      <h1>ZK Location</h1>
      <p>Prove you are in a specific region without revealing your location.</p>
      <button onClick={() => open({ view: "Connect" })}>Open AppKit</button>
    </div>
  );
}
