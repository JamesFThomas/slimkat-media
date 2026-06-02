"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const t = useTranslations("Footer");
  const pathname = usePathname();
  const isFoundation =
    pathname === "/foundation" || pathname.endsWith("/foundation");
  const year = new Date().getFullYear();

  if (isFoundation) {
    return (
      <footer className="bg-[var(--chrome)] text-[var(--foreground)] p-6 mt-auto border-t border-[var(--border)]">
        <div className="container mx-auto flex flex-col gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/jktf-logomark.svg"
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
          />
          <p className="text-sm text-[var(--foreground)]">
            {t("foundation.copyright", { year })}
          </p>
          <p className="text-sm text-[var(--foreground)]">
            {t("foundation.incorporation")}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[var(--chrome)] text-[var(--foreground)] p-4 mt-auto border-t border-[var(--border)]">
      <div className="container mx-auto">
        <Image
          src="/logo/SlimKat_Logo.png"
          alt="SlimKat Media Logo"
          width={200}
          height={100}
        />
        <div className="mt-8">
          &copy; {new Date().getFullYear()} SlimKat Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
