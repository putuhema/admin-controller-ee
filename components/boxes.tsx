export default function Boxes({
  title,
  child,
}: {
  title: string;
  child: Array<Child>;
}) {
  return (
    <div className="flex flex-grow flex-col  rounded-xl text-center px-4 py-2 w-full bg-white ">
      <p className="font-bold text-xl">{title}</p>
      <div className="flex  flex-wrap sm:flex-nowrap gap-2 mt-2 justify-between ">
        {child.map((c) => (
          <div
            key={c.t}
            className="border p-2 rounded-md w-max text-center cursor-pointer hover:bg-neutral-100 relative group"
          >
            <div className="w-max h-max p-4 bg-white/30 backdrop-blur border cursor-pointer absolute top-0 right-0 text-left rounded-md hidden group-hover:block z-40">
              <p>Jon Doe</p>
              <p>Mika Akira Kira</p>
              <p>Mika Akira Kira</p>
              <p>Mika Akira Kira</p>
              <p>Mika Akira Kira</p>
              <p>Mika Akira Kira</p>
            </div>
            <p>{c.t}</p>
            <p className="text-xl font-bold">{c.q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type Child = {
  t: string;
  q: number;
};
