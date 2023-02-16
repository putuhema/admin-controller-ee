import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import {
  BiEditAlt,
  BiChevronLeft,
  BiChevronRight,
  BiSearch,
  BiUserPlus,
} from "react-icons/bi";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import Sidebar from "@/components/Sidebar";
import Alert from "@/components/AlertDialog";
import { Program, Student } from "@/types";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "components/ThemeProvider";

type HomeProps = {
  students: Student[];
};

const Home: NextPage<HomeProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [deleteId, setDeleteId] = useState<number>();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch("http://localhost:3000/api/students");
      const students = await res.json();
      setStudents(students);
    };
    fetchStudent();
  }, [deleteId]);

  const handleDarkModeChange = () => {
    toggleTheme(theme);
  };

  const handleOnDeleteId = (id: number) => {
    setDeleteId(id);
  };
  return (
    <>
      <Head>
        <title>Admin | Erlangga Education</title>
      </Head>

      <main className="w-full flex flex-col sm:flex-row flex-grow">
        <Sidebar />
        <div className="w-full h-screen flex flex-col flex-grow gap-4 p-4 dark:bg-slate-900">
          {theme === "dark" ? (
            <MoonIcon
              onClick={handleDarkModeChange}
              className="flex cursor-pointer self-end text-sky-400 font-bold"
            />
          ) : (
            <SunIcon
              onClick={handleDarkModeChange}
              className="flex cursor-pointer self-end text-sky-400 font-bold"
            />
          )}
          <div className="flex flex-col bg-white dark:bg-slate-900 dark:border-slate-800 py-4 px-6 rounded-md">
            <div className="flex justify-between py-4">
              <form action="#">
                <div className="flex items-center border dark:border-slate-600 rounded">
                  <div className="bg-neutral-200 dark:bg-slate-600 p-2">
                    <BiSearch className="text-neutral-500  text-xl" />
                  </div>
                  <input
                    className="p-1 text-neutral-500 dark:bg-slate-900 outline-none"
                    type="text"
                    placeholder="cari siswa ..."
                  />
                </div>
              </form>
              <Link
                href="/form"
                className="border-2 dark:border-white dark:hover:border-slate-900 px-4 text-xl bg-blue-500 dark:bg-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-slate-700 text-white dark:hover:text-white p-2 rounded-md font-bold"
              >
                <BiUserPlus />
              </Link>
            </div>

            <div className="border dark:border-slate-700 rounded-md ">
              <div className="flex justify-between gap-2 bg-neutral-100 dark:bg-slate-700 dark:text-white/60 p-2 font-bold text-neutral-500">
                <div className="w-1/12 text-center">#</div>
                <div className="w-4/12 text-center">Nama Siswa</div>
                <div className="w-1/12 text-center">Kelas</div>
                <div className="w-3/12 text-center">Program</div>
                <div className="w-2/12 text-center">SPP Disetujui</div>
                <div className="w-2/12 text-center">Pembayaran Terakhir</div>
                <div className="w-2/12 text-center">Pertemuan</div>
                <div className="w-2/12 text-center"></div>
              </div>
              {students.length > 0 && (
                <div
                  key={students.length}
                  className="overflow-auto max-h-screen dark:text-white"
                >
                  {students.map((student, i) => (
                    <div
                      key={student.id}
                      className={` flex justify-between gap-2  p-2 hover:bg-neutral-100 dark:hover:bg-slate-500 ${
                        student.id % 2 === 0
                          ? "bg-neutral-100 dark:bg-slate-600"
                          : ""
                      }`}
                    >
                      <div className="w-1/12 text-center">{i + 1}</div>
                      <Link
                        href={`/student/${student.id}`}
                        className="w-4/12 text-center hover:underline"
                      >
                        {student.name}
                      </Link>
                      <div className="w-1/12 text-center">{student.class}</div>
                      <div className="w-3/12 text-center">
                        <ul className="text-left">
                          {student.program.length > 0 &&
                            JSON.parse(student.program).map((s: Program) => (
                              <li key={s.value}>{s.isCheck && s.value}</li>
                            ))}
                        </ul>
                      </div>
                      <div className="w-2/12 text-end">Rp. 25,000</div>
                      <div className="w-2/12 text-center">28/1/2023</div>
                      <div className="w-2/12 ">
                        <div className="flex gap-1 justify-center">
                          <div className="w-5 h-5 bg-green-300 rounded"></div>
                          <div className="w-5 h-5 bg-green-300 rounded"></div>
                          <div className="w-5 h-5 bg-green-300 rounded"></div>
                          <div className="w-5 h-5 bg-neutral-300 rounded"></div>
                        </div>
                      </div>
                      <div className="w-2/12 flex flex-row gap-2 items-start">
                        <Link
                          href={`/form/${student.id}`}
                          className="p-2 px-4 rounded bg-yellow-300 hover:bg-yellow-400 flex w-max"
                        >
                          <BiEditAlt />
                        </Link>

                        <Alert id={student.id} fn={handleOnDeleteId} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6 gap-4">
              <button className=" cursor-pointer">
                <BiChevronLeft className="text-neutral-400 hover:text-black text-2xl" />
              </button>
              <p className="hover:underline rounded cursor-pointer text-neutral-400">
                1
              </p>
              <p className="hover:underline rounded cursor-pointer font-bold">
                2
              </p>
              <p className=" hover:underline rounded cursor-pointer text-neutral-400">
                3
              </p>
              <button className="cursor-pointer">
                <BiChevronRight className="text-neutral-400 hover:text-black text-2xl" />
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
};

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/students");
//   const students = await res.json();

//   return {
//     props: { students },
//   };
// };
export default Home;
