import circuit from "../../../target/circuits.json";

import { type CompiledCircuit } from "@noir-lang/backend_barretenberg";

import { Noir } from "@noir-lang/noir_js";
import { useEffect, useState } from "react";

export function useNoir() {
  const [noir, setNoir] = useState<Noir | null>(null);

  useEffect(() => {
    const initNoir = async () => {
      const compiledCircuit = circuit as CompiledCircuit;
      const noir = new Noir(compiledCircuit);

      setNoir(noir);
    };

    initNoir();
  }, []);

  return {
    noir,
  };
}
