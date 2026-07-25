import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";
import Results from "./pages/Result";

export default function App() {
  const [hasSavedCalibration, setHasSavedCalibration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("latest-calibration");
    setHasSavedCalibration(!!saved);
  }, []);

  return (
    <>
      <SignedOut>
        <Routes>
          <Route
            path="*"
            element={<Landing />}
          />
        </Routes>
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route
            path="/"
            element={<Workspace />}
          />

          <Route
            path="/results"
            element={<Results />}
          />

          <Route
            path="*"
            element={<Navigate to={hasSavedCalibration ? "/results" : "/"} replace />}
          />
        </Routes>
      </SignedIn>
    </>
  );
}