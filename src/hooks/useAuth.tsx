import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard(required: boolean) {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (required && !token) {
      router.push("/login"); // Redirect if user is not logged in
    } else if (!required && token) {
      router.push("/dashboard/admin"); // Redirect if logged-in user tries to access login/index
    }
  }, [token, required, router]);
}
