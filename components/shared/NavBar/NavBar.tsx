"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { links, PageLinks } from "./components/PageLinks";

export const NavBar = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const shouldUnderlineEnglish = locale === "en" ? true : false;

  console.log(pathname);

  const nextLocalePath =
    locale === "en" ? `/fr${pathname}` : pathname.replace(/^\/fr/, "") || "/";

  return (
    <nav
      id="navbar-container"
      className="sticky top-0 z-50 bg-[var(--chrome)]/60 backdrop-blur-sm text-[var(--foreground)] p-4 border-b border-[var(--border)]"
    >
      <div
        id="navbar-content"
        className="mx-auto w-full flex flex-row justify-between"
      >
        {/* Page links & Button */}
        <PageLinks links={links} pathname={pathname} />

        {/* Language toggle */}
        <Link
          aria-label="Toggle language"
          className="flex items-center justify-center h-10 px-3 rounded-md border border-[var(--border)] hover:bg-[var(--surface)] text-lg leading-none"
          href={`${nextLocalePath}`}
        >
          <span
            className={`${
              shouldUnderlineEnglish ? "underline" : "no-underline"
            }`}
          >
            EN
          </span>{" "}
          |{" "}
          <span
            className={`${
              !shouldUnderlineEnglish ? "underline" : "no-underline"
            }`}
          >
            FR
          </span>
        </Link>
      </div>
    </nav>
  );
};
