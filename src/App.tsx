import { Outlet } from "react-router";

function App() {
  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-300 min-h-screen flex justify-center items-center">
      <main className="w-full max-w-5xl h-full rounded-sm shadow-2xl m-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

