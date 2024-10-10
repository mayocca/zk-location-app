import { Verifier } from "@/components/verifier";
import { Prover } from "@/components/prover";

export default function App() {
  return (
    <div className="py-10 mx-auto mt-10 border rounded-lg shadow-lg max-w-prose border-battleshipGray">
      <header className="flex flex-col items-center text-center gap-4 [&_*]:px-8">
        <h1 className="text-4xl font-bold">ZK Location</h1>
        <span>
          Prove you are in a specific region without revealing your location.
        </span>
      </header>

      <hr className="my-8 border-battleshipGray" />
      <Prover />

      <hr className="my-8 border-battleshipGray" />
      <Verifier />
    </div>
  );
}
