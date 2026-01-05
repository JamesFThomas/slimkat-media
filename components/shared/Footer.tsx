import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className='bg-gray-200 p-4 mt-auto border-t border-black'>
      <div className='container mx-auto'>
        <Image
          src='/logo/SlimKat_Logo.png'
          alt='SlimKat Media Logo'
          width={200}
          height={100}
        />
        <div className='mt-8'>
          &copy; {new Date().getFullYear()} SlimKat Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
