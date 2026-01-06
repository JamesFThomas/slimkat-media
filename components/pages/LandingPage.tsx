'use client';

import { NavBar } from '../shared/NavBar';
import { Footer } from '../shared/Footer';
import Image from 'next/image';
import { SubscriptionForm } from '../shared/SubscriptionForm';
import { useTranslations } from 'next-intl';

export const LandingPage = () => {
  const t = useTranslations('LandingPage');
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex flex-col grow w-full items-center mx-auto gap-4'>
        <section id='Greeting' className='flex flex-col text-center gap-2 p-4'>
          <h1 id='title' className='text-5xl'>
            {t('greeting.title')}
          </h1>
          <span id='subtitle' className='text-xl text font-bold p-2'>
            {t('greeting.subtitle')}
          </span>
          <div className='flex flex-row justify-center '>
            <SubscriptionForm />
          </div>

          <div
            id='studio-image-wrapper'
            className='flex flex-row justify-center gap-4'
          >
            <Image
              id='studio-image-1'
              src='/podcast/PodcastRoom1.png'
              alt={t('greeting.studioImage1Alt')}
              width={300}
              height={200}
            />
            <Image
              id='studio-image-2'
              src='/podcast/PodcastRoom2.png'
              alt={t('greeting.studioImage2Alt')}
              width={300}
              height={200}
            />
          </div>
        </section>
        <section
          id='Biography'
          className='flex flex-col grow items-center gap-5 p-4 w-full bg-[#f7f3ef]'
        >
          <Image
            id='biography-headshot'
            src='/headshot/KaylaThomas_Headshot.jpg'
            alt={t('biography.headShotAlt')}
            width={500}
            height={400}
          />
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
      <Footer />
    </div>
  );
};
