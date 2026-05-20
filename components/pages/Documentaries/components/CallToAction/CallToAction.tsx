import { useTranslations } from "next-intl";

export const CallToAction = () => {
  const t = useTranslations("DocumentariesPage");
  return (
    <div
      id="call-to-action"
      className="flex flex-col w-full justify-center gap-4 h-full p-8 md:p-12  
            shrink-0"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {/* TODO: section eyebrow label */}[ Eyebrow Label ]
      </span>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        {/* TODO: hero headline */}[ Hero Headline ]
      </h1>
      <p className="text-base text-gray-600">
        {/* TODO: hero body copy */}[ Hero body copy goes here ]
      </p>
      <div className="mt-4">
        {/* TODO: CTA button — links to /contact?service=documentary */}
        <button className="px-6 py-3 bg-black text-white font-semibold rounded-md">
          [ CTA Button ]
        </button>
      </div>
    </div>
  );
};
