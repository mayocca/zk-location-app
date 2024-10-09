import circuit from "../../../target/circuits.json";

import {
  type CompiledCircuit,
  UltraHonkBackend,
} from "@noir-lang/backend_barretenberg";

export function useBarretenberg() {
  const compiledCircuit = circuit as CompiledCircuit;
  const backend = new UltraHonkBackend(compiledCircuit);

  return {
    backend,
  };
}
