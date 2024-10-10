import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { PropsWithRef, RefObject, useEffect } from "react";

interface MapDialogProps {
  coordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null;
  title: string;
  dialogRef: RefObject<HTMLDialogElement>;
  isOpen: boolean;
}

export function MapDialog({
  coordinates,
  title,
  dialogRef,
  isOpen,
}: PropsWithRef<MapDialogProps>) {
  useEffect(() => {
    if (isOpen && dialogRef.current && coordinates) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, coordinates, dialogRef]);

  if (!coordinates) return null;

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
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h2 className="mb-4 text-2xl font-bold text-ashGray">{title}</h2>
        <div className="w-full mb-4 text-center h-96">
          <p className="text-sm text-ashGray">
            Northwestern point: {x1.toFixed(6)}, {y1.toFixed(6)}
          </p>
          <p className="text-sm text-ashGray">
            Southeastern point: {x2.toFixed(6)}, {y2.toFixed(6)}
          </p>
          <MapContainer
            className="mt-4"
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
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="w-full btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
