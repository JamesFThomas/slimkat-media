export const SubscriptionForm = () => {
  return (
    <form className='flex flex-row'>
      <input
        id='email input'
        type='email'
        placeholder='Enter your email'
        className='p-2 border border-black grow rounded-l-md border-r-0 hover:cursor-not-allowed'
      />
      <button
        id='subscribe button'
        type='submit'
        className='bg-black text-white p-2 rounded-r-md border-l-0 hover:cursor-not-allowed'
      >
        Subscribe
      </button>
    </form>
  );
};
