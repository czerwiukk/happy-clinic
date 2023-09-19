import { FC, useRef } from "react";
import { Table } from "../types";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Button } from "./Button";
import supabase from "../supabase";
import { useMutation } from "react-query";

export const Patient: FC = () => {
  const { patient, documents } = useLoaderData() as {
    patient: Table<"patients">;
    documents: string[];
  };
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { revalidate } = useRevalidator();

  const _uploadDocument = async (file?: File) => {
    if (!file) return;
    const fileName = `${new Date().getTime()}-${file.name}`;
    const response = await supabase.storage
      .from("documents")
      .upload(fileName, file);
    const path = response.data?.path;
    if (!path) return;
    await supabase.from("documents").insert({ path, patient_id: patient.id });
    revalidate();
  };

  const { mutate: uploadDocument, isLoading: uploading } = useMutation({
    mutationFn: _uploadDocument,
  });

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <section>
      <div className="flex gap-4">
        <h3 className="text-xl">
          <span className="text-xl">{patient.is_male ? "👨" : "👩"} </span>

          {patient.name}
        </h3>

        <section>
          <p>
            <span className="text-xl">☎️ </span>
            {patient.phone_number}
          </p>

          <p>
            <span className="text-xl">🎂 </span>
            {patient.birthday && new Date(patient.birthday).toLocaleString()}
          </p>

          <p>
            <span className="text-xl"> 🧚‍♀️ </span>
            {patient.created_at &&
              new Date(patient.created_at).toLocaleString()}
          </p>
        </section>

        <div>
          <Button
            onClick={async () => {
              const response = await supabase.functions.invoke("send-sms");
              alert(JSON.stringify(response.data));
            }}
          >
            Send sms <span className="text-xl"> 📲 </span> without leaking the
            secret
            <span className="text-xl"> 🤐 </span>
          </Button>
        </div>
      </div>

      <section className="space-y-8">
        <div className="space-y-2 w-96">
          <label>Dokumenty pacjenta</label>
          <div className="grid grid-cols-3">
            {documents.map((d) => (
              <img
                className="border-2"
                key={d}
                src={d}
                alt="xD"
                width={120}
                height={120}
              />
            ))}
          </div>
        </div>

        <input
          ref={hiddenFileInput}
          className="hidden"
          type="file"
          onChange={(e) => uploadDocument(e.target.files?.[0])}
        />

        {uploading ? (
          <span className="text-2xl animate-bounce">Ładujemy wariata 🤞 </span>
        ) : (
          <Button onClick={handleClick}>
            Dodaj dokument <span className="text-xl"> 📜 </span>
          </Button>
        )}
      </section>
    </section>
  );
};
