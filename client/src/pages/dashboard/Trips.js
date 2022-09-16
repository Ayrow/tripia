import { useAppContext } from '../../context/appContext';

const Trips = () => {
  const { theme, themeOptions } = useAppContext();

  return (
    <div>
      <div>
        <h2 className='text-center text-2xl'>My trips</h2>
      </div>
      <div className='flex justify-center mt-2'>
        <button
          type='button'
          className='flex btn gap-2 place-items-center bg-orange-500'>
          Add a new trip
        </button>
      </div>
      <form className='mt-5'>
        <div className='shadow sm:rounded-md'>
          <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
            <div className='flex flex-col md:flex-row flex-wrap gap-5'>
              <div className='flex flex-col gap-2 border rounded-xl p-5'>
                <label htmlFor='' className='text-black'>
                  Destination
                </label>
                <input
                  type='text'
                  className='block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
                />
              </div>
              <div className='flex flex-col gap-2 border rounded-xl p-5'>
                <label htmlFor='' className='text-black'>
                  Theme
                </label>
                <select
                  name=''
                  id=''
                  className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
                  {themeOptions.map((item, index) => {
                    return (
                      <option key={index} value={item} className='capitalize'>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='flex flex-col gap-2 border rounded-xl p-5'>
                <label htmlFor='' className='text-black'>
                  Duration (in days)
                </label>
                <input
                  type='number'
                  min='0'
                  className=' block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
                />
              </div>
              <div className='flex flex-col gap-2 border rounded-xl p-5'>
                <label htmlFor='' className='text-black'>
                  Travelers
                </label>
                <div className='flex gap-4 text-black'>
                  <label htmlFor=''>Adults</label>
                  <div className='flex gap-2'>
                    <button type='button' className='border px-2'>
                      -
                    </button>
                    Value
                    <button type='button' className='border px-2'>
                      +
                    </button>
                  </div>
                </div>
                <div className='flex gap-4 text-black'>
                  <label htmlFor=''>Children</label>
                  <div className='flex gap-2'>
                    <button type='button' className='border px-2'>
                      -
                    </button>
                    Value
                    <button type='button' className='border px-2'>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 border rounded-xl p-5'>
                <label htmlFor='' className='text-black'>
                  Cost (in euros)
                </label>
                <input
                  type='number'
                  min='0'
                  className=' block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 border rounded-xl p-5'>
              <label htmlFor='' className='text-black'>
                Activities
              </label>
              <textarea
                name=''
                id=''
                cols='30'
                rows='5'
                className='text-black'></textarea>
            </div>
            <div className='flex flex-col gap-2 border rounded-xl p-5'>
              <label htmlFor='' className='text-black'>
                Advices
              </label>
              <textarea
                name=''
                id=''
                cols='30'
                rows='5'
                className='text-black'></textarea>
            </div>
            <div className='flex gap-2 justify-end'>
              <button type='submit' className='btn bg-orange-500'>
                Create Trip
              </button>
              <button type='button' className='btn btn-danger bg-red-500'>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Trips;
