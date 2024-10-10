import { useState } from "react";
import { useProofGeneration } from "@/lib/hooks/proof-generation";
import { useLocation } from "@/lib/hooks/location";
import ProofCard from "./proof-card";
import MapDrawer from "./map-drawer";

export function Prover() {
  const [input, setInput] = useState<{ [key: string]: number } | undefined>();
  const { proofData } = useProofGeneration(input);
  const { longitude, latitude } = useLocation();

  const [coordinates, setCoordinates] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  const handleDraw = (coordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }) => {
    setCoordinates(coordinates);
  };

  const handleProve = async () => {
    if (!coordinates) {
      alert("Please draw a rectangle");
      return;
    }

    const input = {
      ...coordinates,
      x: longitude!,
      y: latitude!,
    };

    setInput(input);
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Prover</h2>
      <div className="px-4 mt-8">
        <MapDrawer onDraw={handleDraw} />
      </div>

      {/* Prove */}
      <div className="flex justify-center px-4 mt-8">
        <button className="w-full btn btn-primary" onClick={handleProve}>
          Generate Proof
        </button>
      </div>
      {proofData && <ProofCard proofData={proofData} />}
    </>
  );
}
