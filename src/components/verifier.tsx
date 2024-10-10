import { useRef, useState } from "react";
import { hexToUint8Array } from "@/lib/utils";
import {
  BarretenbergBackend,
  type CompiledCircuit,
} from "@noir-lang/backend_barretenberg";
import circuit from "../../target/circuits.json";
import { MapDialog } from "./map-dialog";

export function Verifier() {
  const [proofInput, setProofInput] = useState("");
  const [publicInputs, setPublicInputs] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(
    null,
  );
  const [decodedInputs, setDecodedInputs] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const verifyProof = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      if (isValid) {
        const decoded = {
          x1: parsedPublicInputs[0] / 10 ** 6 - 180,
          y1: parsedPublicInputs[1] / 10 ** 6 - 90,
          x2: parsedPublicInputs[2] / 10 ** 6 - 180,
          y2: parsedPublicInputs[3] / 10 ** 6 - 90,
        };
        setDecodedInputs(decoded);
        dialogRef.current?.showModal();
      } else {
        alert("Invalid proof!");
        setDecodedInputs(null);
      }
    } catch (error) {
      setDecodedInputs(null);
      console.error("Verification error:", error);
      alert("Error verifying proof. Please check the console for details.");
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-ashGray">
      <h2 className="mb-4 text-4xl font-bold text-center">Verifier</h2>
      <form onSubmit={verifyProof} className="flex flex-col gap-4">
        <label className="form-control">
          <span className="label-text">Public Inputs</span>
          <textarea
            className="w-full textarea textarea-bordered"
            rows={3}
            value={publicInputs}
            onChange={(e) => setPublicInputs(e.target.value)}
            placeholder="Paste your public inputs here (as a JSON array)..."
          />
        </label>

        <label className="form-control">
          <span className="label-text">Proof</span>
          <textarea
            className="w-full textarea textarea-bordered"
            rows={5}
            value={proofInput}
            onChange={(e) => setProofInput(e.target.value)}
            placeholder="Paste your proof here..."
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Verify Proof
        </button>
      </form>
      {verificationResult !== null && (
        <div className="mt-4">
          <h3 className="font-semibold">Verification Result:</h3>
          <p className={verificationResult ? "text-green-500" : "text-red-500"}>
            {verificationResult ? "Valid Proof" : "Invalid Proof"}
          </p>
          {decodedInputs && (
            <div className="mt-2">
              <h4 className="font-semibold">Decoded Public Inputs:</h4>
              <p>Latitude 1: {decodedInputs.y1.toFixed(6)}</p>
              <p>Longitude 1: {decodedInputs.x1.toFixed(6)}</p>
              <p>Latitude 2: {decodedInputs.y2.toFixed(6)}</p>
              <p>Longitude 2: {decodedInputs.x2.toFixed(6)}</p>
            </div>
          )}
        </div>
      )}
      <MapDialog
        dialogRef={dialogRef}
        title="Verified Area"
        coordinates={decodedInputs}
        isOpen={decodedInputs !== null}
      />
    </div>
  );
}
