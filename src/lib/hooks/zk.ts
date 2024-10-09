import circuit from "../../../target/circuits.json";

import {
  type CompiledCircuit,
  BarretenbergBackend,
  // BarretenbergVerifier as Verifier,
} from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export function useZk() {
  const compiledCircuit = circuit as CompiledCircuit;
  const backend = new BarretenbergBackend(compiledCircuit);
  const noir = new Noir(compiledCircuit);

  return {
    noir,
    backend,
  };
}
