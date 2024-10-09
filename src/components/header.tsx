export default function Header() {
  return (
    <header className="flex flex-col items-center text-center gap-4 [&_*]:px-8">
      <h1 className="text-2xl font-bold">ZK Location</h1>
      <span>
        Prove you are in a specific region without revealing your location.
      </span>
    </header>
  );
}
