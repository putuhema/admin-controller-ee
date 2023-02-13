import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { BiEditAlt } from "react-icons/bi";
import Pill from "@/components/Pill";
import Sidebar from "@/components/Sidebar";
import { EventClickArg } from "@fullcalendar/core";
import { GetServerSideProps, NextPage } from "next";
import { StudentProps, Calendar } from "@/types";

const StudentDetail: NextPage<StudentProps> = ({ student }) => {
  const [events, setEvents] = useState<Calendar[]>([]);

  const handleDateClick = (info: DateClickArg) => {
    setEvents([
      ...events,
      {
        id: info.dateStr,
        title: "hadir",
        date: info.dateStr,
        color: "#33a35c",
      },
    ]);
  };
  const handleEventClick = (info: EventClickArg) => {
    info.event.remove();
    setEvents(events.filter((event) => event.id !== info.event.id));
  };
  return (
    <>
      <Head>
        <title>Admin | Erlangga Education</title>
      </Head>
      <main className="flex flex-col sm:flex-row  flex-grow w-full">
        <Sidebar />
        <div className="flex  gap-4  w-full  p-4 rounded">
          <div className="bg-white w-full rounded flex p-6 gap-6">
            <div className="flex flex-col w-full h-max bg-white max-w-xl rounded-lg ">
              <div className="flex   border p-2 rounded">
                <div className="w-32 h-32 bg-neutral-500 rounded-full"></div>
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
                  <Pill
                    color="bg-neutral-200"
                    text="Matematika SD I, II, III"
                  />
                  <Pill
                    color="bg-neutral-300"
                    text="Bahasa Inggris SD I, II, III"
                  />
                  <Pill color="bg-neutral-400" text="Prisma" />
                  <Pill
                    color="bg-neutral-500"
                    text="Calistung"
                    textColor="text-white"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                locale="id"
                editable={true}
                selectable={true}
                dateClick={(info) => handleDateClick(info)}
                eventClick={(info) => handleEventClick(info)}
                events={events}
              />
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
