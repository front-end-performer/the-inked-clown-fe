import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import type { Session } from "@/lib";
import AdminTabs from "./components/adminTabs/adminTabs";

export default async function DashBoardPage() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="p-2">
      <AdminTabs sessionUser={session?.user} />
    </div>
  );
}
