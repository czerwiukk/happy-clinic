import { RouterProvider } from "react-router-dom";
import { UserOrLogin } from "./components/UserOrLogin";
import { useSetupUser, useUser } from "./hooks/useUser";
import router from "./router";

function App() {
  useSetupUser();

  const { user } = useUser();
  return (
    <main className="p-8 space-y-8">
      <section>
        <h1 className="text-xl font-semibold">
          <span className="text-4xl">👩‍⚕️</span> Welcome to Happy Clinics!
        </h1>
        <h2 className="text-lg mb-2">
          In reality there is no clinics, just a Supabase overview...
        </h2>
      </section>

      <UserOrLogin />

      {user && <RouterProvider router={router} />}
    </main>
  );
}

export default App;
