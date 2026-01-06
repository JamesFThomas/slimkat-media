export const SubscriptionForm = () => {
  return (
    <form className='flex flex-row'>
      <input
        type='email'
        placeholder='Enter your email'
        className='p-2 border border-black grow rounded-l-md border-r-0'
      />
      <button
        type='submit'
        className='bg-black text-white p-2 rounded-r-md border-l-0 hover:cursor-pointer'
      >
        Subscribe
      </button>
    </form>
  );
};
