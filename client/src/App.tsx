import { Routes, Route, Navigate } from "react-router-dom";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import { ToastProvider } from "./components/ui/Toast";
import { AuthStatusToasts } from "./components/AuthStatusToasts";

import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";
import Results from "./pages/Result";

export default function App() {
  // const hasSavedCalibration =
  //   typeof window !== "undefined" &&
  //   !!localStorage.getItem("latest-calibration");

  return (
    <ToastProvider>
      <AuthStatusToasts />

      <SignedOut>
        <Routes>
          <Route path="*" element={<Landing />} />
        </Routes>
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route path="/" element={<Workspace />} />

          <Route path="/results" element={<Results />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SignedIn>
    </ToastProvider>
  );
}
