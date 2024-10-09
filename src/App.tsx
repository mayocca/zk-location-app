import Header from "@/components/header";
import MapDrawer from "@/components/map-drawer";

export default function App() {
  const handleDraw = (coordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }) => {
    console.log(coordinates);
  };

  return (
    <div className="py-10 mx-auto mt-10 border rounded-lg shadow-lg max-w-prose border-battleshipGray">
      <Header />
      <div className="px-4 mt-8">
        <MapDrawer onDraw={handleDraw} />
      </div>
    </div>
  );
}
