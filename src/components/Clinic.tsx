import { Outlet, useLoaderData } from "react-router-dom";
import { Table } from "../types";
import { FC } from "react";

type ClinicData = {
  clinic: Table<"clinics">;
};

export const Clinic: FC = () => {
  const { clinic } = useLoaderData() as ClinicData;

  return (
    <section>
      <h3 className="text-2xl flex items-center gap-2 mb-4">
        <span className="text-4xl">🏩 </span>
        {clinic.name}
      </h3>

      <Outlet />
    </section>
  );
};
