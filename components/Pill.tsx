export default function Pill({
  text,
  color,
  textColor,
}: {
  text: string;
  color: string;
  textColor?: string;
}) {
  return (
    <div
      className={`${color} rounded-md p-2 ${
        textColor ? textColor : "text-black"
      }`}
    >
      {text}
    </div>
  );
}
