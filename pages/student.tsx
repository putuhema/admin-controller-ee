import Head from "next/head";
import Sidebar from "@/components/Sidebar";

export default function Student() {
  return (
    <>
      <Head>
        <title>Admin | Erlangga Educataion</title>
      </Head>
      <Sidebar />
      <main className=" w-full ">
        <h1>student</h1>
      </main>
    </>
  );
}
