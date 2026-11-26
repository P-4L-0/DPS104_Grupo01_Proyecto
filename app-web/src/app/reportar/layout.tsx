"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useIssues } from "../context/IssuesContext";

export default function ReportarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isStep1Valid, isStep2Valid } = useIssues();

  useEffect(() => {
    if (pathname.endsWith("/paso-2") && !isStep1Valid) {
      router.replace("/reportar/paso-1");
    } else if (pathname.endsWith("/paso-3")) {
      if (!isStep1Valid) router.replace("/reportar/paso-1");
      else if (!isStep2Valid) router.replace("/reportar/paso-2");
    }
  }, [pathname, isStep1Valid, isStep2Valid, router]);

  return <>{children}</>;
}