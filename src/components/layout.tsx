import { AppKitProvider } from "@/lib/providers/wagmi";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-red text-text">
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  );
}
