import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { BiArrowBack } from "react-icons/bi";
import Sidebar from "@/components/Sidebar";
import { StudentProps, Form, Program } from "@/types";

const programs = [
  "Calistung",
  "Matematika SD Kelas I,II,III",
  "Matematika SD kelas IV,V,VI",
  "Matematika SMP",
  "Bahasa Inggris SD Kelas I,II,III",
  "Bahasa Inggris SD Kelas IV,V,VI",
  "Bahasa Inggris SMP",
  "Prisma Kalkulator Tangan",
];

const StudentForm: NextPage<StudentProps> = ({ student }) => {
  const pickedProgram: Program[] = JSON.parse(student.program);
  console.log(pickedProgram);

  const [formData, setFormData] = useState<Form>({
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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id !== "program") {
      setFormData({ ...formData, [event.target.id]: event.target.value });
    }
  };

  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        program: [...formData.program!, { value: value, isCheck: checked }],
      });
    } else {
      const index = formData.program!.findIndex(
        (p: Program) => p.value === value
      );
      formData.program!.splice(index, 1);
      setFormData({ ...formData, program: formData.program });
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
              action="/api/edit-student"
              method="post"
              onSubmit={handleOnSubmit}
              className="w-full max-w-lg mt-10"
            >
              <input type="hidden" name="id" value={student.id} />
              <div className="flex flex-col mb-6">
                <label htmlFor="name" className="text-neutral-500">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => handleOnChange(e)}
                  value={student.name}
                  name="name"
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col flex-grow">
                  <label htmlFor="placeOfBirth" className="text-neutral-500">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={student.placeOfBirth}
                    id="placeOfBirth"
                    name="placeOfBirth"
                    className="border rounded p-2"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <label htmlFor="dateOfBirth" className="text-neutral-500">
                    Tangal Lahir
                  </label>
                  <input
                    type="date"
                    onChange={(e) => handleOnChange(e)}
                    value={student.dateOfBirth}
                    id="dateOfBirth"
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="class" className="text-neutral-500">
                    Kelas
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={student.class}
                    id="class"
                    name="class"
                    className="border rounded p-2"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="address" className="text-neutral-500">
                    Alamat
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    value={student.address}
                    id="address"
                    name="address"
                    className="border rounded p-2"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mb-3">
                <fieldset className="border p-2 py-2 flex gap-2">
                  <legend className="text-neutral-500">Nama Orang tua</legend>
                  <div className="flex flex-col w-full">
                    <label htmlFor="fathername" className="text-neutral-500">
                      Nama Ayah
                    </label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={student.fathername}
                      id="fathername"
                      name="fathername"
                      className="border rounded p-2"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="mothername" className="text-neutral-500">
                      Nama Ibu
                    </label>
                    <input
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      value={student.mothername}
                      id="mothername"
                      name="mothername"
                      className="border rounded p-2"
                    />
                  </div>
                </fieldset>
              </div>
              <div className="flex flex-col w-full gap-2 mb-6">
                <label htmlFor="phone" className="text-neutral-500">
                  HP/WA
                </label>
                <input
                  type="text"
                  onChange={(e) => handleOnChange(e)}
                  value={student.phone}
                  id="phone"
                  name="phone"
                  className="border roudned p-2 w-full"
                />
              </div>
              <div className="flex w-full gap-2">
                <fieldset className="border p-4 py-4 flex gap-4 w-full">
                  <legend className="text-neutral-500">Program</legend>
                  <div className="flex flex-col">
                    {pickedProgram.map((program) => (
                      <div key={program.value} className="flex gap-2">
                        <input
                          type="checkbox"
                          name="program"
                          onChange={(e) => handleChangeCheckBox(e)}
                          value={program.value}
                          id={program.value}
                          checked={program.isCheck}
                          className="w-4"
                        />
                        <label htmlFor={program.value}>{program.value}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md font-bold float-right my-6 text-white">
                Tambah Siswa
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<StudentProps> = async (
  context
) => {
  const res = await fetch(
    `http://localhost:3000/api/student/${context.params!.id}`
  );
  const student = await res.json();
  return {
    props: { student },
  };
};

export default StudentForm;
