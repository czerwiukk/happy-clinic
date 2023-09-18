import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { Table } from "../types";

export const ClinicsList = () => {
  const nav = useNavigation();
  const clinics = useLoaderData() as Table<"clinics">[];

  if (nav.state === "loading")
    return (
      <p>
        Loading clinics... <span className="text-2xl">🤔</span>
      </p>
    );

  if (!clinics?.length)
    return (
      <p>
        You have no available clinics! <span className="text-2xl">😩</span>
      </p>
    );

  return (
    <section className="space-y-2">
      <h3>Dostępne kliniki:</h3>

      <ul className="space-y-1">
        {clinics.map((clinic) => (
          <li key={clinic.id}>
            <Link
              to={`/${clinic.id}`}
              className="text-lg font-bold cursor-pointer flex items-center gap-2"
            >
              <span className="text-2xl">👉 </span>

              <span className="underline">{clinic.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
