"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    async function logout() {
      try {
        const res = await fetch("/api/users/logout", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          setMessage("✅ Logged out successfully");

          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          setMessage("❌ Logout failed");
        }
      } catch {
        setMessage("❌ Something went wrong");
      }
    }

    logout();
  }, [router]);

  return (
    <div className="min-h-screenflex items-center justify-center">
      <div className="shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center">
          {message}
        </h1>
      </div>
    </div>
  );
}