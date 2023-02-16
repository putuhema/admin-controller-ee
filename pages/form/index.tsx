import Head from "next/head";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { BiArrowBack } from "react-icons/bi";
import Sidebar from "@/components/Sidebar";
import { Form, Program } from "@/types";

const programStatic = [
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
];

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
    program: programStatic,
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
        program: program.map((p) =>
          p.value === value ? { ...p, isCheck: checked } : p
        ),
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
      program: programStatic,
    });
  }
  return (
    <>
      <Head>
        <title>Tambah Siswa | Erlangga Educataion</title>
      </Head>
      <main className="flex flex-col sm:flex-row flex-grow w-full ">
        <Sidebar />
        <div className="w-full h-full flex justify-center dark:bg-slate-900  flex-grow gap-4 p-4">
          <div className=" rounded-md bg-white dark:bg-slate-900 dark:text-white dark:border dark:border-slate-700 flex flex-col items-center justify-center w-full  p-4">
            <Link
              href="/"
              className="self-start text-2xl cursor-pointer flex gap-2  text-neutral-400 dark:text-white hover:text-black "
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
                <label htmlFor="name" className="dark:text-slate-500">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => handleOnChange(e)}
                  value={formData?.name}
                  name="name"
                  className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col flex-grow ">
                  <label htmlFor="placeOfBirth" className="dark:text-slate-500">
                    tempat
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.placeOfBirth}
                    id="placeOfBirth"
                    name="placeOfBirth"
                    className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <label htmlFor="dateOfBirth" className="dark:text-slate-500">
                    Tangal Lahir
                  </label>
                  <input
                    type="date"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.dateOfBirth}
                    id="dateOfBirth"
                    className="w-full border rounded p-2 focus:outline-none dark:text-slate-700 dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="class" className="dark:text-slate-500">
                    Kelas
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.class}
                    id="class"
                    name="class"
                    className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="address" className="dark:text-slate-500">
                    Alamat
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={formData?.address}
                    id="address"
                    name="address"
                    className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <fieldset className="border dark:border-slate-700 p-4 py-4 flex gap-4 w-full rounded">
                  <legend className="dark:text-slate-500">
                    Nama Orang tua
                  </legend>
                  <div className="flex gap-2">
                    <label htmlFor="fathername" className="dark:text-slate-500">
                      ayah
                    </label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={formData?.fathername}
                      id="fathername"
                      name="fathername"
                      className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="mothername" className="dark:text-slate-500">
                      ibu
                    </label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={formData?.mothername}
                      id="mothername"
                      name="mothername"
                      className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                    />
                  </div>
                </fieldset>
              </div>
              <div className="flex w-full gap-2 mb-6">
                <label htmlFor="phone" className="dark:text-slate-500">
                  HP/WA
                </label>
                <input
                  type="text"
                  onChange={(e) => handleOnChange(e)}
                  value={formData?.phone}
                  id="phone"
                  name="phone"
                  className="w-full border rounded p-2 focus:outline-none dark:bg-slate-900 dark:border dark:border-slate-700  dark:focus:ring-1 focus:ring-slate-700"
                />
              </div>
              <div className="flex w-full gap-2">
                <fieldset className="border dark:border-slate-700 p-4 py-4 flex gap-4 w-full rounded">
                  <legend className="dark:text-slate-500">Program</legend>
                  <div className="flex flex-col">
                    {programStatic.map((program) => (
                      <div
                        key={program.value}
                        className="flex gap-2 dark:text-slate-400"
                      >
                        <input
                          type="checkbox"
                          name="program"
                          onChange={(e) => handleChangeCheckBox(e)}
                          value={program.value}
                          id={program.value}
                          className="w-4 dark:bg-slate-900 "
                        />
                        <label htmlFor={program.value}>{program.value}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <button className="bg-blue-500 dark:bg-white hover:bg-blue-600 dark:hover:bg-slate-700  p-2 rounded-md font-bold float-right mt-6 text-white dark:text-slate-700 dark:hover:text-white">
                Tambah Siswa
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
