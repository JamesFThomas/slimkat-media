"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Engagement = {
  event: string;
  date: string;
  venue: string;
  location: string;
  url: string;
};

export const SpeakingEngagements = () => {
  const t = useTranslations("ProductionsPage");
  const engagements = t.raw("speaking.engagements") as Engagement[];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1100px] mx-auto p-4">
      {/* Speaker intro */}
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start pb-6 border-b border-gray-200">
        <div className="w-40 h-40 lg:w-48 lg:h-48 shrink-0 rounded-full overflow-hidden relative">
          <Image
            src="/images/headshot/KaylaThomas_Headshot.jpg"
            alt={t("speaking.speakerImageAlt")}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <h3 className="text-xl font-bold">{t("speaking.speakerName")}</h3>
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)] max-w-xl">
            {t("speaking.speakerBio")}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold">{t("speaking.header")}</h2>

      {/* Desktop header row */}
      <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_2fr_40px] gap-4 pb-2 border-b border-[var(--border)]">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          {t("speaking.columns.event")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          {t("speaking.columns.date")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          {t("speaking.columns.venue")}
        </span>
        <span />
      </div>

      {/* Engagement rows */}
      <ul className="flex flex-col">
        {engagements.map((engagement, index) => {
          const isExpanded = expandedIndex === index;
          const hasLink = engagement.url !== "";

          return (
            <li
              key={index}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              {/* Main row */}
              <div
                className="grid grid-cols-[1fr_auto_40px] lg:grid-cols-[2fr_1fr_1fr_2fr_40px] gap-4 py-4 items-center lg:cursor-default cursor-pointer"
                onClick={() => {
                  if (window.innerWidth < 1024) toggleRow(index);
                }}
              >
                <span className="text-sm font-semibold">
                  {engagement.event}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {engagement.date}
                </span>
                <span className="hidden lg:block text-sm text-[var(--muted-foreground)]">
                  {engagement.venue}, {engagement.location}
                </span>

                {/* Link icon — desktop only, only when URL exists */}
                <div className="flex items-center justify-end">
                  {hasLink && (
                    <Link
                      href={engagement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hidden lg:block text-[var(--accent-link)] hover:opacity-70 transition-opacity"
                      aria-label={`Link for ${engagement.event}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                  )}
                  <span
                    className="lg:hidden text-[var(--muted-foreground)] transition-transform duration-200"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Accordion expanded content — mobile only */}
              {isExpanded && (
                <div className="lg:hidden flex flex-col gap-2 pb-4 pl-2 animate-[slideFadeIn_300ms_ease-out]">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                      {t("speaking.columns.venue")}
                    </span>
                    <span className="text-sm">
                      {engagement.venue}, {engagement.location}
                    </span>
                  </div>

                  {hasLink && (
                    <Link
                      href={engagement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--accent-link)] hover:underline mt-1"
                    >
                      {t("speaking.viewEvent")}
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <div className="flex justify-center pt-4">
        <Link
          href="/contact?service=speaking"
          className="px-6 py-3 rounded-md bg-black text-white text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          {t("speaking.cta")}
        </Link>
      </div>
    </div>
  );
};
