import CompletedTask from "@/Components/completed";
import Sidebar from "@/Components/Sidebar/page";
import useAuth from "@/hooks/authRedirecct";


export default function Home() {
    return (
      <div className="min-h-screen flex   bg-gray-100">
        <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <CompletedTask />
        </main>
        </div>
      </div>
    );
  }