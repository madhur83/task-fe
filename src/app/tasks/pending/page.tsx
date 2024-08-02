import PendingTable from "@/Components/pending";
import Sidebar from "@/Components/Sidebar/page";


export default function Home() {
    return (
      <div className="min-h-screen flex   bg-gray-100">
        <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <PendingTable />
        </main>
        </div>
      </div>
    );
  }