import { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { BiEditAlt } from "react-icons/bi";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Pill from "@/components/Pill";
import Sidebar from "@/components/Sidebar";
import { GetServerSideProps, NextPage } from "next";
import { StudentProps, Program } from "@/types";
import Avatar from "react-avatar";
import axios from "axios";

const StudentDetail: NextPage<StudentProps> = ({ student }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datePicked, setDatePicked] = useState("");
  const [meeting, setMeeting] = useState(
    student.meeting.length > 0 ? JSON.parse(student.meeting) : []
  );
  console.log(meeting);

  const handleDateClick = (info: DateClickArg) => {
    setIsOpen(!isOpen);
    setDatePicked(info.dateStr);
    setMeeting([
      ...meeting,
      {
        id: info.dateStr,
        title: "hadir",
        start: info.dateStr,
        color: "#22c55e",
      },
    ]);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/student/add-meeting",
      data: {
        student,
        date: JSON.stringify(meeting),
      },
    });
    setIsOpen(false);
  };

  const handleEventClick = () => setIsOpen(!isOpen);

  return (
    <>
      <Head>
        <title>Admin | Erlangga Education</title>
      </Head>
      <main className="flex flex-col sm:flex-row  flex-grow w-full">
        <Sidebar />
        <div className="flex dark:bg-slate-900  gap-4  w-full  p-4">
          <div className="flex flex-col bg-white dark:bg-slate-900 dark:border dark:border-slate-700 w-full rounded  p-6 gap-6">
            <div>
              <Link href="/">
                <ChevronLeftIcon className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col w-full h-max bg-white max-w-xl rounded-lg ">
                <div className="flex   border p-2 rounded">
                  <Avatar
                    className="w-32 h-32 rounded-full"
                    name={student.name}
                  />
                  <div className="flex flex-1 flex-col ml-10">
                    <p className="font-bold text-xl mb-4 flex gap-1">
                      {student.name}
                      <span className="bg-neutral-200 p-1 px-2 rounded-md ml-4">
                        {student.class} SD
                      </span>
                      <BiEditAlt className="ml-2 cursor-pointer" />
                    </p>
                    <p>
                      {student.placeOfBirth}, {student.dateOfBirth}
                    </p>
                    <p>{student.address}</p>
                    <p>Orang Tua</p>
                    <p>{student.fathername}</p>
                    <p>{student.mothername}</p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex mt-4">
                  <p className="font-bold text-xl">Program</p>
                  <div className="ml-20 flex flex-col jus gap-2 items-start">
                    {JSON.parse(student.program).map(
                      (p: Program) =>
                        p.isCheck && (
                          <Pill
                            key={p.value}
                            text={p.value}
                            color="bg-neutral-200"
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="z-10">
                  <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="id"
                    editable={true}
                    selectable={true}
                    dateClick={(info) => handleDateClick(info)}
                    eventClick={() => handleEventClick()}
                    events={meeting}
                  />
                </div>
              </div>
              <div className="z-50">
                <AlertDialog.Root open={isOpen}>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-white/30 backdrop-blur-sm overlay z-50" />
                    <AlertDialog.Content className="z-50 p-4 bg-white border rounded-md shadow-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 content">
                      <AlertDialog.Title className="text-2xl">
                        {datePicked}
                      </AlertDialog.Title>
                      <AlertDialog.Description>
                        {datePicked}
                      </AlertDialog.Description>
                      <div className="flex gap-4 mt-4 flex-end">
                        <AlertDialog.Cancel asChild>
                          <form
                            onSubmit={(e) => handleOnSubmit(e)}
                            action={`/api/student/add-meeting/${student.id}`}
                          >
                            <button className="bg-green-100 border-2 text-green-800 p-2 rounded-md">
                              input
                            </button>
                          </form>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <form action="/api/meeting-delete" method="delete">
                            <button
                              type="submit"
                              className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-md "
                            >
                              hapus tanggal ?
                            </button>
                          </form>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<StudentProps> = async (
  context
) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/student/${id}`);
  const student = await res.json();

  return {
    props: { student },
  };
};

export default StudentDetail;
