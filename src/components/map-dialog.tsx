import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";

interface MapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  title: string;
}

export function MapDialog({
  isOpen,
  onClose,
  coordinates,
  title,
}: MapDialogProps) {
  if (!isOpen) return null;

  const { x1, y1, x2, y2 } = coordinates;
  const bounds = [
    [Math.min(y1, y2), Math.min(x1, x2)],
    [Math.max(y1, y2), Math.max(x1, x2)],
  ];
  const center = [(y1 + y2) / 2, (x1 + x2) / 2];

  // Calculate the map bounds to show a larger area
  const mapBounds = [
    [Math.min(y1, y2) - 5, Math.min(x1, x2) - 5],
    [Math.max(y1, y2) + 5, Math.max(x1, x2) + 5],
  ];

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-xl bg-raisin">
        <h2 className="mb-4 text-2xl font-bold text-ashGray">{title}</h2>
        <div className="w-full mb-4 h-96">
          <MapContainer
            center={center as LatLngExpression}
            bounds={mapBounds as [[number, number], [number, number]]}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Rectangle
              bounds={bounds as [[number, number], [number, number]]}
              pathOptions={{ color: "red", weight: 2, fillOpacity: 0.2 }}
            />
          </MapContainer>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 transition-colors rounded bg-secondary text-raisin hover:bg-opacity-80"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
