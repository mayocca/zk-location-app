import Header from "@/components/header";
import MapDrawer from "@/components/map-drawer";
import { useLocation } from "@/lib/hooks/location";
import { type ProofData } from "@noir-lang/backend_barretenberg";
import { useState } from "react";
import { useNoir } from "@/lib/hooks/noir";
import { useBarretenberg } from "@/lib/hooks/barretenberg";

export default function App() {
  const { longitude, latitude } = useLocation();
  const { noir } = useNoir();
  const { backend } = useBarretenberg();

  const [coordinates, setCoordinates] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const [proof, setProof] = useState<ProofData | null>(null);

  const handleDraw = async (coordinates: {
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

    if (!noir) {
      alert("Noir is not initialized");
      return;
    }

    const input = {
      ...coordinates,
      x: longitude!,
      y: latitude!,
    };

    const { witness } = await noir.execute(input);
    const proof = await backend.generateProof(witness);
    setProof(proof);
  };

  return (
    <div className="py-10 mx-auto mt-10 border rounded-lg shadow-lg max-w-prose border-battleshipGray">
      <Header />
      <div className="px-4 mt-8">
        <MapDrawer onDraw={handleDraw} />
      </div>

      {/* Prove */}
      <div className="flex justify-center px-4 mt-8">
        <button
          className="px-4 py-2 text-white rounded-md bg-battleshipGray"
          onClick={handleProve}
        >
          Generate Proof
        </button>
      </div>

      {proof && <div className="px-4 mt-8">Proof: {proof.proof}</div>}
    </div>
  );
}
