import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { Table } from "../types";

export const PatientsList = () => {
  const nav = useNavigation();
  const { patients } = useLoaderData() as { patients: Table<"patients">[] };

  if (nav.state === "loading")
    return (
      <p className="animate-pulse">
        Ładujemy pacjentów... <span className="text-2xl">🤔</span>
      </p>
    );

  if (!patients?.length)
    return (
      <p>
        Nie ma pacjentów <span className="text-2xl">😩</span>
      </p>
    );
  console.log(patients);
  return (
    <section className="space-y-2">
      <h3>Dzielni pacjenci:</h3>

      <ul className="space-y-1">
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link
              to={`patients/${patient.id}`}
              className="text-lg font-bold cursor-pointer flex items-center gap-2"
            >
              <span className="text-2xl">{patient.is_male ? "👨" : "👩"} </span>

              {patient.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
