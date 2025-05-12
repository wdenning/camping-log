import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import trailData from "../assets/centerline.json";

// Extend the Leaflet control type to include the fullscreen plugin
declare module "leaflet" {
  namespace control {
    function fullscreen(options?: any): Control;
  }
}

const calculateCumulativeDistances = (coordinates: [number, number][]) => {
  const distances = [0];
  for (let i = 1; i < coordinates.length; i++) {
    const [lon1, lat1] = coordinates[i - 1];
    const [lon2, lat2] = coordinates[i];
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 0.621371; // Convert to miles
    distances.push(distances[distances.length - 1] + distance);
  }
  return distances;
};

const createNumberedIcon = (number: number) => {
  return L.divIcon({
    className: "numbered-icon",
    html: `<div style="background-color: white; border: 2px solid black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; color: black;">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const Map = ({ milesPerDay }: { milesPerDay: number }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([35.39352808136067, -83.42742919921875], 8);

      // Add fullscreen control to the map
      L.control.fullscreen({
        position: "topleft",
      }).addTo(map);

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.geoJSON(trailData as any).addTo(map);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    const addMarkers = () => {
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.current?.removeLayer(layer);
          }
        });

        const coordinates = [...(trailData.geometry.coordinates as [number, number][])].reverse();
        const cumulativeDistances = calculateCumulativeDistances(coordinates);
        const totalDistance = cumulativeDistances[cumulativeDistances.length - 1];
        const maxDays = 33;
        const interval = milesPerDay; // Use the updated miles per day
        const numMarkers = Math.min(maxDays, Math.ceil(totalDistance / interval) + 1);

        for (let i = 0; i < numMarkers; i++) {
          const targetDistance = i === 0 ? 0 : (i - 1) * interval;
          let markerIndex = cumulativeDistances.findIndex(
            (distance) => distance >= targetDistance
          );

          if (markerIndex === -1) {
            markerIndex = cumulativeDistances.length - 1;
          }

          const [lon, lat] = coordinates[markerIndex];
          const numberedIcon = createNumberedIcon(i);
          L.marker([lat, lon], { icon: numberedIcon })
            .bindPopup(`Day ${i}: ${targetDistance.toFixed(1)} miles`)
            .addTo(mapRef.current);
        }
      }
    };

    addMarkers();
  }, [milesPerDay]); // Re-run marker logic when milesPerDay changes

  return <div id="map" style={{ width: "100%", height: "480px" }}></div>;
};

export default Map;