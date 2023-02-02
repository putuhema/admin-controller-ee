export default function Boxes({
  title,
  child,
}: {
  title: string;
  child: Array<Child>;
}) {
  return (
    <div className="flex flex-grow flex-col  rounded-xl text-center px-4 py-2 w-full bg-white">
      <p>{title}</p>
      <div className="flex gap-2 mt-2 justify-between">
        {child.map((c) => (
          <div key={c.q} className="border p-2 rounded-md w-full text-center">
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
