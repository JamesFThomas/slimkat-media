import { NavBar } from '../shared/NavBar';
import { Footer } from '../shared/Footer';

export const LandingPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex grow container text-center justify-center items-center mx-auto p-4'>
        <section>
          <h1>Welcome to the Landing Page</h1>
          <p>This is the main entry point of our application.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
