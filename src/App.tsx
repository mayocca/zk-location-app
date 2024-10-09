import Header from "@/components/header";
import MapDrawer from "@/components/map-drawer";
import { useLocation } from "@/lib/hooks/location";
import { useState } from "react";
import { useProofGeneration } from "./lib/hooks/proof-generation";

export default function App() {
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

    // Multiply by 10^6 to match the precision of the witness and cast to integer
    const sanitizedInput = {
      x: Math.round(input.x * 1000000),
      y: Math.round(input.y * 1000000),
      x1: Math.round(input.x1 * 1000000),
      y1: Math.round(input.y1 * 1000000),
      x2: Math.round(input.x2 * 1000000),
      y2: Math.round(input.y2 * 1000000),
    };

    console.log("input", sanitizedInput);
    setInput(sanitizedInput);
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

      {proofData && <div className="px-4 mt-8">Proof: {proofData.proof}</div>}
    </div>
  );
}
