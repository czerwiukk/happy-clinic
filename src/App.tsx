import { UserOrLogin } from "./components/UserOrLogin";
import { useSetupUser } from "./hooks/useUser";

function App() {
  useSetupUser();
  return (
    <main className="p-8">
      <h1 className="text-xl font-semibold">Welcome to Happy Clinic!</h1>

      <h2 className="text-lg">
        In reality there is no clinic, just a Supabase overview.
      </h2>

      <UserOrLogin />
    </main>
  );
}

export default App;
