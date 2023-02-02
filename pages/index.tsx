import Head from "next/head";

import Sidebar from "@/components/Sidebar";
import Boxes from "@/components/boxes";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin | Erlangga Education</title>
      </Head>

      <main className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <Sidebar />
        <div className="w-full h-full flex flex-col flex-grow overflow-auto gap-4 p-4">
          <div className="flex flex-grow gap-4 justify-between ">
            <div className="border rounded-xl text-center px-4 py-2 w-fit bg-white">
              <p>Siswa</p>
              <p className="text-6xl font-bold">19</p>
            </div>
            <Boxes
              title={"Program"}
              child={[
                { t: "calistung", q: 4 },
                { t: "Matematika SD I, II, III", q: 10 },
                { t: "Matematika SD IV, V, IV", q: 13 },
                { t: "Matematika SMP", q: 1 },
                { t: "Bahasa Inggris SD I, II, III", q: 3 },
                { t: "Bahasa Inggris SD IV, V, IV", q: 6 },
                { t: "Prisma", q: 10 },
              ]}
            />
          </div>
          {/* table */}
          <div className="flex flex-col bg-white py-4 px-6 h-[718px] rounded-md">
            <div className="flex justify-end py-4">
              <button className="border-2 border-black p-2 rounded-md font-bold">
                tambah murid
              </button>
            </div>
            <div className="flex justify-between gap-2 bg-neutral-100 p-2">
              <div className=" w-1/12">#</div>
              <div className="w-1/2">Student Name</div>
              <div className="w-1/12">Class</div>
              <div className="w-3/12">program</div>
              <div className="w-2/12">agreed spp</div>
              <div className="w-2/12">last payment</div>
              <div className="w-2/12">acc/paid</div>
              <div className="w-2/12">action</div>
            </div>
            <div className="overflow-auto">
              {[1, 2, 3, 4, 5, 7, 8, 9, 10].map((n) => (
                <div
                  key={n}
                  className={` flex justify-between gap-2  p-2 rounded-md hover:bg-neutral-100 ${
                    n % 2 === 0 ? "bg-neutral-100" : ""
                  }`}
                >
                  <div className=" w-1/12">{n}</div>
                  <div className="w-1/2">Jon Doe</div>
                  <div className="w-1/12">V</div>
                  <div className="w-3/12">
                    <ul>
                      <li>math</li>
                      <li>english</li>
                      <li>prisma</li>
                    </ul>
                  </div>
                  <div className="w-2/12">Rp. 25,000</div>
                  <div className="w-2/12">28/1/2023</div>
                  <div className="w-2/12">Rp. 25,000</div>
                  <div className="w-2/12">
                    <button className="border p-2 px-4 rounded mr-4">+</button>
                    <button className="border p-2 px-4 rounded ">x</button>
                  </div>
                </div>
              ))}
            </div>

            {/* row */}
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
}
