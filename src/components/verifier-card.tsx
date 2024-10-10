import { useState } from "react";
import { hexToUint8Array } from "@/lib/utils";
import {
  BarretenbergBackend,
  type CompiledCircuit,
} from "@noir-lang/backend_barretenberg";
import circuit from "../../target/circuits.json";

export function VerifierCard() {
  const [proofInput, setProofInput] = useState("");
  const [publicInputs, setPublicInputs] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(
    null,
  );

  const verifyProof = async () => {
    const compiledCircuit = circuit as CompiledCircuit;
    try {
      const backend = new BarretenbergBackend(compiledCircuit, {
        threads: navigator.hardwareConcurrency,
      });

      const proofBytes = hexToUint8Array(proofInput);
      const parsedPublicInputs = JSON.parse(publicInputs);
      const isValid = await backend.verifyProof({
        proof: proofBytes,
        publicInputs: parsedPublicInputs,
      });

      setVerificationResult(isValid);
      alert(isValid ? "Valid proof!" : "Invalid proof!");
    } catch (error) {
      console.error("Verification error:", error);
      alert("Error verifying proof. Please check the console for details.");
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-ashGray">
      <h2 className="mb-4 text-xl font-bold">Proof Verifier</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Enter Proof:</h3>
        <textarea
          className="w-full p-2 mt-2 text-sm rounded bg-raisin"
          rows={5}
          value={proofInput}
          onChange={(e) => setProofInput(e.target.value)}
          placeholder="Paste your proof here..."
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Enter Public Inputs:</h3>
        <textarea
          className="w-full p-2 mt-2 text-sm rounded bg-raisin"
          rows={3}
          value={publicInputs}
          onChange={(e) => setPublicInputs(e.target.value)}
          placeholder="Paste your public inputs here..."
        />
      </div>
      <button
        onClick={verifyProof}
        className="px-4 py-2 transition-colors rounded bg-secondary text-raisin hover:bg-opacity-80"
      >
        Verify Proof
      </button>
      {verificationResult !== null && (
        <div className="mt-4">
          <h3 className="font-semibold">Verification Result:</h3>
          <p className={verificationResult ? "text-green-500" : "text-red-500"}>
            {verificationResult ? "Valid Proof" : "Invalid Proof"}
          </p>
        </div>
      )}
    </div>
  );
}
