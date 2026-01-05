import { NavBar } from '../shared/NavBar';
import { Footer } from '../shared/Footer';
import Image from 'next/image';

export const LandingPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex flex-col grow w-full items-center mx-auto gap-4'>
        <section id='Greeting' className='flex flex-col text-center gap-2 p-4'>
          <h1 className='text-5xl'>Jackson Metro’s newest podcast studio</h1>
          <span className='text-xl text font-bold p-2'>
            Curious about pricing? Sign up to be the first to know when our
            studio opens for business!
          </span>
          {/* SubscriptionForm Component will go here */}
          <div
            id='studio-images'
            className='flex flex-row justify-center gap-4'
          >
            <Image
              src='/podcast/PodcastRoom1.png'
              alt='Podcast Studio Image 1'
              width={300}
              height={200}
            />
            <Image
              src='/podcast/PodcastRoom2.png'
              alt='Podcast Studio Image 2'
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
            src='/headshot/KaylaThomas_Headshot.jpg'
            alt='Headshot of Kayla Turner Thomas'
            width={500}
            height={400}
          />
          <p className='max-w-xl text-center font-medium leading-7'>
            {`While the job titles have changed over the years, my nearly 15-year
            career in local television has been centered around two things in
            one way or another: growing viewership or growing revenue.`}
          </p>

          <p className='max-w-xl text-center font-medium leading-7'>
            {`This has consisted of everything from producing promotional
            materials, TV commercials, sponsored segments, and special interest
            TV programs, to showrunner, executive producer, media sales and
            marketing.`}
          </p>

          <p className='max-w-xl text-center font-medium leading-7'>
            Additionally an independent filmmaker, I’ve been able to secure
            distribution for my debut documentary,{' '}
            <span className='font-light'>Farming Freedom,</span> which is
            available beginning in 2026.
          </p>

          <p className='max-w-xl text-center font-medium leading-7'>
            {`With more than a decade's experience of managing projects from
            inception to launch, I look forward to bringing that very experience
            to Jackson Metro's newest podcast studio for anyone seeking to
            produce professional shows that are distribution ready for any
            platform.`}
          </p>

          <span className='max-w-xl text-center font-medium leading-7'>
            {`-Kayla Turner Thomas, Television Executive`}
          </span>
          {/* SubscriptionForm Component will go here */}
        </section>
      </main>
      <Footer />
    </div>
  );
};
