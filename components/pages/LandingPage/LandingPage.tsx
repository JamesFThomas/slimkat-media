'use client';
import { SubscriptionForm } from '../../shared/SubscriptionForm/SubscriptionForm';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CarouselItem } from './components/Carousel/CarouselItem';

export const LandingPage = () => {
  const t = useTranslations('LandingPage');
  return (
    <div>
      <main className='flex flex-col grow w-full items-center mx-auto gap-4'>
        <section id='header' className='flex flex-col text-center gap-2 p-4'>
          <div id='slimKatLogo-image-wrapper' className='max-w-[700px]'>
            <Image
              id='studio-image-2'
              className='w-full h-auto'
              src='/logo/SlimKat_Logo.png'
              alt={t('header.studioImage2Alt')}
              width={700}
              height={200}
            />
          </div>
          <span
            id='subtitle'
            className='text-lg md:text-2xl font-normal text-[var(--muted-foreground)]'
          >
            {t('header.title')}
          </span>

          <div id='carousel-wrapper' className='w-full flex justify-center'>
            <div id='carousel' className='w-full max-w-[800px]'>
              <CarouselItem />
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
              src='/headshot/KaylaThomas_Headshot.jpg'
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
