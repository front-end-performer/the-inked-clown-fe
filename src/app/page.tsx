import { getServerSession } from "next-auth";
import authOptions from "./api/auth/authOptions";
import { checkUserRole } from "@/utils/auth";
import type { Session } from "@/lib/features";
import HomePage from "@/components/pages/homePage";
import AdminDashBoard from "@/components/pages/adminDashBoard";

export default async function IndexPage() {
  const session: Session | null = await getServerSession(authOptions);

  if (session && checkUserRole(session.user.role).isAdminRole) {
    return <AdminDashBoard session={session} />;
  }

  return <HomePage />;
}
