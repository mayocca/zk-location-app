import { uint8ArrayToHex } from "@/lib/utils/hex";
import { ProofData } from "@noir-lang/backend_barretenberg";
import { useState } from "react";

export default function ProofCard({ proofData }: { proofData: ProofData }) {
  const [copied, setCopied] = useState(false);

  const proofString = uint8ArrayToHex(proofData.proof);

  const trimmedProof = `${proofString.slice(0, 24)}...${proofString.slice(
    -24,
  )}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proofString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-ashGray">
      <h2 className="mb-4 text-xl font-bold">Proof Details</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Public Inputs:</h3>
        <pre className="p-2 overflow-x-auto text-sm rounded bg-raisin">
          {JSON.stringify(proofData.publicInputs, null, 2)}
        </pre>
      </div>
      <div>
        <h3 className="font-semibold">Proof:</h3>
        <div className="flex items-center">
          <pre className="flex-grow p-2 mr-2 overflow-x-auto rounded bg-raisin">
            {trimmedProof}
          </pre>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 transition-colors rounded bg-secondary text-raisin hover:bg-opacity-80"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
