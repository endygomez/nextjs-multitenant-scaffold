import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { cookies } from "next/headers";

export default function LoginPage() {
  const cookieStore = cookies();
  const subdomain = cookieStore.get("subdomain");

  console.log(cookieStore);

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
