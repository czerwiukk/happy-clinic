import { createBrowserRouter } from "react-router-dom";
import supabase from "./supabase";
import { ClinicsList } from "./components/ClinicsList";
import { Clinic } from "./components/Clinic";
import { PatientsList } from "./components/PatientsList";
import { Patient } from "./components/Patient";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const clinics = await supabase.from("clinics").select("*");
      return clinics.data ?? [];
    },
    element: <ClinicsList />,
  },
  {
    path: "/:clinicId",
    errorElement: <h3>No such clinic, sorry bro! </h3>,
    loader: async ({ params }) => {
      const clinicId = `${params.clinicId}`;

      const clinic = await supabase
        .from("clinics")
        .select("*")
        .eq("id", clinicId)
        .single();

      if (!clinic.data) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }

      return { clinic: clinic.data };
    },
    element: <Clinic />,
    children: [
      {
        path: "",
        element: <PatientsList />,
        loader: async ({ params }) => {
          const clinicId = `${params.clinicId}`;
          const patients = await supabase
            .from("patients")
            .select("name, id")
            .eq("clinic_id", clinicId);
          return { patients: patients.data };
        },
      },
      {
        path: "patients/:patientId",
        errorElement: <h3>U got something wrong with the patient link bro</h3>,
        element: <Patient />,
        loader: async ({ params }) => {
          const patientId = `${params.patientId}`;

          const patient = await supabase
            .from("patients")
            .select("*")
            .eq("id", patientId)
            .single();

          const documents = await supabase
            .from("documents")
            .select("*")
            .eq("patient_id", patientId);

          const urls = await supabase.storage
            .from("documents")
            .createSignedUrls(documents.data?.map((doc) => doc.path) ?? [], 60);

          console.log(urls);

          return {
            patient: patient.data,
            documents: urls.data?.map((url) => url.signedUrl),
          };
        },
      },
    ],
  },
]);

export default router;
