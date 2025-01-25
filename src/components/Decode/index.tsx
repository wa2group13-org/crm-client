import he from "he";

export default function Decode({ text }: { text?: string }) {
  if (!text) return <></>;
  const decoded = he.decode(text);
  return <>{decoded}</>;
}
