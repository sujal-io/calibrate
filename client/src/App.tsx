import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Workspace />
      </SignedIn>
    </>
  );
}

export default App;