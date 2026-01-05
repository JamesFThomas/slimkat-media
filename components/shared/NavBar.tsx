import Image from 'next/image';

export const NavBar = () => {
  return (
    <nav className='bg-gray-200 p-4 border-b border-black'>
      <div className='container mx-auto'>
        <Image
          src='/logo/SlimKat_Logo.png'
          alt='SlimKat Media Logo'
          width={200}
          height={100}
        />
      </div>
    </nav>
  );
};
