import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <div className="text-center space-y-5">
          <h1 className="text-4xl font-bold">
            Welcome to Calibrate 🚀
          </h1>

          <UserButton afterSignOutUrl="/" />

          <p className="text-gray-500">
            Authentication Successful
          </p>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;