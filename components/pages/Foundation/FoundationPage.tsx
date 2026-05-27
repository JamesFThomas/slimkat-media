"use client";

import { useTranslations } from "next-intl";
import { SubscriptionForm } from "../../shared/SubscriptionForm/SubscriptionForm";

interface StrategicModelLabels {
  media: string;
  wellness: string;
  community: string;
  education: string;
  voice: string;
  educationOuter: string;
  scholarship: string;
}

interface StrategicModelProps {
  labels: StrategicModelLabels;
}

const StrategicModel = ({ labels }: StrategicModelProps) => (
  <svg
    width="100%"
    viewBox="0 0 780 640"
    role="img"
    aria-label="JKTF Strategic Model"
  >
    <title>JKTF Strategic Model</title>
    <desc>
      Triangle with royal blue outer bands labeled {labels.voice},{" "}
      {labels.educationOuter}, {labels.scholarship}. Inner triangle divided into
      four light blue sections: {labels.media}, {labels.wellness},{" "}
      {labels.community}, {labels.education}.
    </desc>

    <defs>
      <clipPath id="innerClip">
        <polygon points="390,110 160,510 620,510" />
      </clipPath>
    </defs>

    {/* Outer triangle */}
    <polygon
      points="390,30 80,570 700,570"
      fill="#1A3A8F"
      stroke="#122970"
      strokeWidth="1.5"
    />

    {/* Inner triangle white base */}
    <polygon points="390,110 160,510 620,510" fill="white" />

    {/* 4 inner sections */}
    <polygon
      points="390,110 236,377 390,377"
      fill="#EBF0FB"
      clipPath="url(#innerClip)"
    />
    <polygon
      points="390,110 390,377 544,377"
      fill="#EBF0FB"
      clipPath="url(#innerClip)"
    />
    <polygon
      points="236,377 160,510 390,510 390,377"
      fill="#D6E2F7"
      clipPath="url(#innerClip)"
    />
    <polygon
      points="390,377 390,510 620,510 544,377"
      fill="#D6E2F7"
      clipPath="url(#innerClip)"
    />

    {/* Dividing lines */}
    <line
      x1="390"
      y1="110"
      x2="390"
      y2="510"
      stroke="#1A3A8F"
      strokeWidth="0.75"
      opacity="0.35"
      clipPath="url(#innerClip)"
    />
    <line
      x1="236"
      y1="377"
      x2="544"
      y2="377"
      stroke="#1A3A8F"
      strokeWidth="0.75"
      opacity="0.35"
      clipPath="url(#innerClip)"
    />

    {/* Inner triangle border */}
    <polygon
      points="390,110 160,510 620,510"
      fill="none"
      stroke="#1A3A8F"
      strokeWidth="1"
    />

    {/* VOICE — left band */}
    <text
      style={{
        fontSize: "13px",
        fontWeight: 500,
        fill: "#ffffff",
        letterSpacing: "4px",
      }}
      x="252"
      y="305"
      textAnchor="middle"
      dominantBaseline="central"
      transform="rotate(-58,252,305)"
    >
      {labels.voice}
    </text>

    {/* EDUCATION — right band */}
    <text
      style={{
        fontSize: "13px",
        fontWeight: 500,
        fill: "#ffffff",
        letterSpacing: "4px",
      }}
      x="528"
      y="305"
      textAnchor="middle"
      dominantBaseline="central"
      transform="rotate(58,528,305)"
    >
      {labels.educationOuter}
    </text>

    {/* SCHOLARSHIP — bottom band */}
    <text
      style={{
        fontSize: "13px",
        fontWeight: 500,
        fill: "#ffffff",
        letterSpacing: "4px",
      }}
      x="390"
      y="544"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {labels.scholarship}
    </text>

    {/* Inner section labels */}
    <text
      x="334"
      y="282"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "17px", fontWeight: 600, fill: "#1A3A8F" }}
    >
      {labels.media}
    </text>

    <text
      x="446"
      y="282"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "17px", fontWeight: 600, fill: "#1A3A8F" }}
    >
      {labels.wellness}
    </text>

    <text
      x="294"
      y="444"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "17px", fontWeight: 600, fill: "#1A3A8F" }}
    >
      {labels.community}
    </text>

    <text
      x="486"
      y="444"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "17px", fontWeight: 600, fill: "#1A3A8F" }}
    >
      {labels.education}
    </text>
  </svg>
);

export const FoundationPage = () => {
  const t = useTranslations("FoundationPage");

  return (
    <div className="flex flex-col w-full">
      <main className="flex flex-col w-full items-center mx-auto">
        {/* ── Header ── */}
        <section className="flex flex-col text-center gap-3 px-6 py-12 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            {t("header.title")}
          </h1>
        </section>

        {/* ── Strategic Model ── */}
        <section className="w-full max-w-2xl px-6 pb-16 flex flex-col items-center gap-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            {t("model.label")}
          </h2>
          <StrategicModel
            labels={{
              media: t("model.media"),
              wellness: t("model.wellness"),
              community: t("model.community"),
              education: t("model.education"),
              voice: t("model.voice"),
              educationOuter: t("model.educationOuter"),
              scholarship: t("model.scholarship"),
            }}
          />
        </section>

        {/* ── Mission ── */}
        <section className="w-full max-w-3xl px-6 pb-16 flex flex-col gap-6 text-center">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            {t("mission.label")}
          </h2>
          <p className="text-xl leading-relaxed text-gray-700 font-light">
            {t("mission.body")}
          </p>
        </section>

        {/* ── Programs + Subscribe ── */}
        <section className="w-full bg-gray-50 border-t border-gray-100 px-6 py-16 flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("programs.title")}
          </h2>
          <p className="text-gray-500 max-w-lg leading-relaxed">
            {t("programs.body")}
          </p>
          <div className="w-full max-w-sm">
            <SubscriptionForm />
          </div>
        </section>
      </main>
    </div>
  );
};
