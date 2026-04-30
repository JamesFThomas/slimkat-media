'use client';
import { SubscriptionForm } from '../../shared/SubscriptionForm/SubscriptionForm';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Carousel } from './components/Carousel/Carousel';
import { ServicesLinks } from './components/Services/ServicesLinks';
import { ServicesImageList } from './components/Services/ServicesImageList';

export const LandingPage = () => {
  const t = useTranslations('LandingPage');
  return (
    <div>
      <main className='flex flex-col grow w-full items-center mx-auto gap-4'>
        <section
          id='hero'
          className='flex flex-col items-center text-center w-full pt-32 py-12 min-h-[100vh] justify-evenly'
        >
          <div className='flex flex-col items-center'>
            <div
              id='slimKatLogo-image-wrapper'
              className='max-w-[700px] px-4 sm:px-0'
            >
              <Image
                id='SlimKat_Logo'
                className='w-full h-auto'
                src='/logo/SlimKat_Logo.png'
                alt={t('hero.studioImage2Alt')}
                width={700}
                height={200}
              />
            </div>
            <span
              id='subtitle'
              className='text-base sm:text-xl md:text-2xl font-normal text-[var(--muted-foreground)]'
            >
              {t('hero.title')}
            </span>
          </div>

          <Carousel />
        </section>

        <section
          id='description'
          className=' pb-24 md:pb-32 text-center max-w-4xl mx-auto text-4xl font-semibold leading-tight space-y-1'
        >
          <p>{t('about.aboutLine1')}</p>
          <p>{t('about.aboutLine2')}</p>
          <p>{t('about.aboutLine3')}</p>
        </section>

        {/* Services Section */}
        <section id='services'>
          <div
            id='services-wrapper'
            className='flex flex-col items-center gap-4 px-4 py-16 md:py-24 w-full text-[var(--foreground)]'
          >
            <div
              id='services-header-wrapper'
              className='flex flex-col items-center gap-4'
            >
              <h1
                id='services-header'
                className='text-5xl md:text-7xl font-bold'
              >
                Services We Provide
              </h1>

              <p
                id='services-description'
                className='text-center text-xl font-medium max-w-2xl mx-auto text-[var(--foreground)]/70'
              >
                Here, we tell meaningful stories, producing powerful
                documentaries and creating content that informs, inspires, and
                endures.
              </p>
            </div>
            <div
              id='services-list-grid'
              className='grid grid-cols-1 md:grid-cols-6 gap-10 m-3 w-full max-w-[1200px]'
            >
              <div
                id='services-images'
                className='hidden md:block md:col-span-2'
              >
                <ServicesImageList />
              </div>
              <div id='services-list' className='md:col-span-4'>
                <ServicesLinks />
              </div>
            </div>
          </div>
        </section>

        <section
          id='Biography'
          className='flex flex-col grow items-center gap-5 p-4 w-full bg-[var(--surface)] text-[var(--foreground)]'
        >
          <div
            id='headshot-wrapper'
            className='w-full max-w-[520px] md:w-[560px]'
          >
            <Image
              id='biography-headshot'
              className='w-full h-auto'
              src='/images/headshot/KaylaThomas_Headshot.jpg'
              alt={t('biography.headShotAlt')}
              width={500}
              height={400}
            />
          </div>
          <p
            id='biography-paragraph1'
            className='max-w-xl text-center font-medium leading-7'
          >
            {t('biography.bioParagraph1')}
          </p>

          <p
            id='biography-paragraph2'
            className='max-w-xl text-center font-medium leading-7'
          >
            {t('biography.bioParagraph2')}
          </p>

          <p
            id='biography-paragraph3'
            className='max-w-xl text-center font-medium leading-7'
          >
            {t('biography.bioParagraph3')}
          </p>

          <p
            id='biography-paragraph4'
            className='max-w-xl text-center font-medium leading-7'
          >
            {t('biography.bioParagraph4')}
          </p>

          <span
            id='biography-signature'
            className='max-w-xl text-center font-medium leading-7'
          >
            {t('biography.signature')}
          </span>
          <SubscriptionForm />
        </section>
      </main>
    </div>
  );
};
