import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const cookiesStore = cookies();

  const tenantId = cookiesStore.get("tenantId")?.value;

  if (!tenantId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
