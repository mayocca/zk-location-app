import { useEffect, useState } from "react";
import circuit from "../../../target/circuits.json";
import {
  BarretenbergBackend,
  type CompiledCircuit,
  ProofData,
} from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export function useProofGeneration(inputs?: { [key: string]: number }) {
  const [proofData, setProofData] = useState<ProofData | undefined>();
  const [backend, setBackend] = useState<BarretenbergBackend>();
  const [noir, setNoir] = useState<Noir | undefined>();

  const proofGeneration = async () => {
    if (!inputs) return;
    const compiledCircuit = circuit as CompiledCircuit;
    const backend = new BarretenbergBackend(compiledCircuit, {
      threads: navigator.hardwareConcurrency,
    });
    const noir = new Noir(compiledCircuit);

    const { witness } = await noir.execute(inputs);

    const data = await backend.generateProof(witness);

    setProofData(data);
    setNoir(noir);
    setBackend(backend);
  };

  useEffect(() => {
    if (!inputs) return;
    proofGeneration();
  }, [inputs]);

  return { noir, proofData, backend };
}
