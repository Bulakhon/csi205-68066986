
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/tailgrids/core/badge";
import type { UserCredential } from "@/data/credential";

// type Credential = {
//   token: string;
//   email: string;
//   name: string;
//   role: string;
// };

export default function User() {
  const pathname = usePathname();
const [credential, setCredential] =
    useState<UserCredential | null>(null);

  useEffect(() => {
    const loadCredential = () => {
      const credentialString = localStorage.getItem("credential");

      if (credentialString) {
        try {
          const data: UserCredential = JSON.parse(credentialString);
          setCredential(data);
        } catch {
          setCredential(null);
        }
      } else {
        setCredential(null);
      }
    };

    loadCredential();

    // ตรวจสอบเมื่อ localStorage เปลี่ยนจาก Tab อื่น
    window.addEventListener("storage", loadCredential);

    return () => {
      window.removeEventListener("storage", loadCredential);
    };
  }, [pathname]);

  if (!credential) return null;

  return (
    <div className="mt-4 flex flex-wrap justify-center items-center gap-5 text-sm">
      <div className="flex items-center gap-2">
        <strong>ROLE:</strong>
        <Badge color="error" size="lg">
          {credential.role.toUpperCase()}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <strong>NAME:</strong>
        <Badge color="success" size="lg">
          {credential.name}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <strong>EMAIL:</strong>
        <Badge color="gray" size="lg">
          {credential.email}
        </Badge>
      </div>
    </div>
  );
}
