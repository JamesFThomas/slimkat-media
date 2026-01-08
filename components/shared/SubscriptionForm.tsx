export const SubscriptionForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className='flex flex-row'>
      <input
        type='email'
        disabled
        placeholder='Enter your email'
        className='p-2 border border-black grow rounded-l-md border-r-0 hover:cursor-not-allowed'
      />
      <button
        type='submit'
        disabled
        className='bg-black text-white p-2 rounded-r-md border-l-0 hover:cursor-not-allowed'
        onClick={handleSubmit}
      >
        Subscribe
      </button>
    </form>
  );
};
