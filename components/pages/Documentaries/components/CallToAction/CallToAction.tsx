import Link from "next/link";
import { useTranslations } from "next-intl";

export const CallToAction = () => {
  const t = useTranslations("DocumentariesPage");

  return (
    <div
      id="call-to-action"
      className="flex flex-col w-full justify-center gap-4 h-full p-8 md:p-12 shrink-0"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {t('hero.eyebrow')}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        {t('hero.headline')}
      </h1>
      <p className="text-base text-gray-600">
        {t('hero.body')}
      </p>
      <div className="mt-4">
        <Link
          href="/contact?service=documentary"
          className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
        >
          {t('hero.cta')}
        </Link>
      </div>
    </div>
  );
};
