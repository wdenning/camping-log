import { useState, useRef } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Map from "../components/Map";
import NavLink from '../components/NavLink';

const MapPage = () => {
  const [milesPerDay, setMilesPerDay] = useState(10);
  const [realisticMode, setRealisticMode] = useState(true);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const calculateAdjustedMiles = (miles: number) => {
    return realisticMode ? miles * 0.7 : miles; // Simplified adjustment logic
  };

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <div>
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
      <div className="page-content">
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <label htmlFor="milesPerDay">Miles per day: </label>
          <select
            id="milesPerDay"
            value={milesPerDay}
            onChange={(e) => setMilesPerDay(Number(e.target.value))}
          >
            {[...Array(16).keys()].map((i) => {
              const value = i + 10;
              return (
                <option key={i} value={value}>
                  {value === 10 ? "10 (Baby Steps)" : value === 25 ? "25 (Zoomin')" : value}
                </option>
              );
            })}
          </select>
          <div style={{ marginTop: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={realisticMode}
                onChange={(e) => setRealisticMode(e.target.checked)}
              />
              Realistic Mode
            </label>
            <button
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                background: "none",
                border: "none",
                textDecoration: "underline",
                padding: "0",
                fontSize: "inherit",
              }}
              onClick={openDialog}
            >
              What's this?
            </button>
          </div>
        </div>
        <dialog ref={dialogRef} style={{ padding: "20px", borderRadius: "5px" }}>
          <p>
            In "Realistic Mode," the mile markers are adjusted to approximately 70% of the actual distance to simulate the impact of vertical gain. The miles per day shown here are approximate and do not account for the additional distance caused by the Appalachian Trail's vertical gains and peak-to-peak paths.
          </p>
          <button onClick={closeDialog} style={{ marginTop: "10px", cursor: "pointer" }}>
            Gotcha!
          </button>
        </dialog>
        <ErrorBoundary>
          <Map milesPerDay={calculateAdjustedMiles(milesPerDay)} />
        </ErrorBoundary>
        <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}>
          GeoJSON data source: <a href="https://github.com/anandthakker/apptrail" target="_blank" rel="noopener noreferrer">https://github.com/anandthakker/apptrail</a>
        </p>
      </div>
    </div>
  );
};

export default MapPage;