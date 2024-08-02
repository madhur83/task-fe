import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">My Sidebar</div>
      <ul className="mt-4">
        <li className="p-2 hover:bg-gray-700">
          <Link href="/">Tasks</Link>
        </li>
        <li className="p-2 hover:bg-gray-700">
        <Link href="/tasks/pending">Pending</Link>
        </li>
        <li className="p-2 hover:bg-gray-700">
          <Link href="/tasks/completed">complete</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
