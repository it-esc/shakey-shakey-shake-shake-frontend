import Link from 'next/link';

type Props = {
  i: number;
};

const Card = ({ i }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 p-4">
      <h1 className="text-2xl text-gray-700">กลุ่มที่ {i + 1}</h1>
      <Link href={`/group/${i + 1}`}>
        <button className="rounded-2xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
          เข้าร่วมกลุ่ม
        </button>
      </Link>
    </div>
  );
};

export default Card;
