import { Outlet } from "react-router";

function App() {
  return (
    <div className="p-2 bg-gray-300 min-h-screen flex justify-center items-center">
      <main className="min-w-3xl max-w-5xl h-full rounded-sm shadow-2xl m-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
