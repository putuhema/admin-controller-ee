import Head from "next/head";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { BiArrowBack } from "react-icons/bi";
import Sidebar from "@/components/Sidebar";
import { Form, Program } from "@/types";

export default function Student() {
  const [formData, setFormData] = useState<Form>({
    name: "",
    placeOfBirth: "",
    dateOfBirth: "",
    class: "",
    address: "",
    fathername: "",
    mothername: "",
    phone: "",
    program: [
      {
        value: "Calistung",
        isCheck: false,
      },
      {
        value: "Matematika SD Kelas I,II,III",
        isCheck: false,
      },
      {
        value: "Matematika SD kelas IV,V,VI",
        isCheck: false,
      },
      {
        value: "Matematika SMP",
        isCheck: false,
      },
      {
        value: "Bahasa Inggris SD Kelas I,II,III",
        isCheck: false,
      },
      {
        value: "Bahasa Inggris SD Kelas IV,V,VI",
        isCheck: false,
      },
      {
        value: "Bahasa Inggris SMP",
        isCheck: false,
      },
      {
        value: "Prisma Kalkulator Tangan",
        isCheck: false,
      },
    ],
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id !== "program") {
      setFormData({ ...formData, [event.target.id]: event.target.value });
    }
  };

  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const program = formData.program!;

    if (checked) {
      setFormData({
        ...formData,
        program: program.map((p) => ({ ...p, isCheck: p.value === value })),
      });
    } else {
      const index = program.findIndex((p: Program) => p.value === value);
      program.splice(index, 1);
      setFormData({ ...formData, program });
    }
  };

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/add-student",
      data: { ...formData, program: JSON.stringify(formData.program) },
    });

    setFormData({
      name: "",
      placeOfBirth: "",
      dateOfBirth: "",
      class: "",
      address: "",
      fathername: "",
      mothername: "",
      phone: "",
      program: [],
    });
  }
  return (
    <>
      <Head>
        <title>Tambah Siswa | Erlangga Educataion</title>
      </Head>
      <main className="flex flex-col sm:flex-row flex-grow w-full ">
        <Sidebar />
        <div className="w-full h-full flex justify-center flex-grow gap-4 p-4">
          <div className=" rounded-md bg-white  flex flex-col items-center justify-center w-full  p-4">
            <Link
              href="/"
              className="self-start text-2xl cursor-pointer flex gap-2  text-neutral-400 hover:text-black "
            >
              <BiArrowBack /> <span className="text-sm">Home</span>
            </Link>
            <h2 className="font-bold text-2xl mt-6">
              Form Siswa Baru Erlangga Education
            </h2>
            <form
              action="/api/add-student"
              method="post"
              onSubmit={handleOnSubmit}
              className="w-full max-w-lg mt-10"
            >
              <div className="flex flex-col mb-6">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => handleOnChange(e)}
                  value={formData?.name}
                  name="name"
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col flex-grow gap-4">
                  <label htmlFor="placeOfBirth">tempat</label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.placeOfBirth}
                    id="placeOfBirth"
                    name="placeOfBirth"
                    className="border rounded p-2"
                  />
                </div>
                <div className="flex flex-col gap-4 flex-grow">
                  <label htmlFor="dateOfBirth">Tangal Lahir</label>
                  <input
                    type="date"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.dateOfBirth}
                    id="dateOfBirth"
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="class">Kelas</label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.class}
                    id="class"
                    name="class"
                    className="border rounded p-2"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="address">Alamat</label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.address}
                    id="address"
                    name="address"
                    className="border rounded p-2"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <fieldset className="border p-2 py-4 flex gap-4">
                  <legend>Nama Orang tua</legend>
                  <div className="flex gap-2">
                    <label htmlFor="fathername">ayah</label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={formData?.fathername}
                      id="fathername"
                      name="fathername"
                      className="border rounded p-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="mothername">ibu</label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={formData?.mothername}
                      id="mothername"
                      name="mothername"
                      className="border rounded p-2"
                    />
                  </div>
                </fieldset>
              </div>
              <div className="flex w-full gap-2 mb-6">
                <label htmlFor="phone">HP/WA</label>
                <input
                  type="text"
                  onChange={(e) => handleOnChange(e)}
                  value={formData?.phone}
                  id="phone"
                  name="phone"
                  className="border roudned p-2 w-full"
                />
              </div>
              <div className="flex w-full gap-2">
                <fieldset className="border p-4 py-4 flex gap-4 w-full">
                  <legend>Program</legend>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="program"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Calistung"
                        id="calistung"
                        className="w-4"
                      />
                      <label htmlFor="calistung">Calistung</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Matematika SD Kelas I,II,III"
                        name="program"
                        id="math1"
                        className="w-4"
                      />
                      <label htmlFor="math1">
                        Matematika SD Kelas I, II, III
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Matematika SD Kelas IV,V,VI"
                        name="program"
                        id="math2"
                        className="w-4"
                      />
                      <label htmlFor="math2">
                        Matematika SD Kelas IV, V, VI
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Prisma Kalkulator Tangan"
                        name="program"
                        id="prisma"
                        className="w-4"
                      />
                      <label htmlFor="prisma">Prisma Kalkulator Tangan</label>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Matematika SMP"
                        name="program"
                        id="math3"
                        className="w-4"
                      />
                      <label htmlFor="math3">Matematika SMP</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Bahasa Inggris SD I,II,III"
                        name="program"
                        id="english1"
                        className="w-4"
                      />
                      <label htmlFor="english1">
                        Bahasa Inggris SD I, II, II
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeCheckBox(e)}
                        value="Bahasa Inggris SD IV,V,VI"
                        name="program"
                        id="english2"
                        className="w-4"
                      />
                      <label htmlFor="english2">
                        Bahasa Inggris SD IV, V, VI
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 p-4 rounded-md font-bold float-right mt-6 text-white">
                Tambah Siswa
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
