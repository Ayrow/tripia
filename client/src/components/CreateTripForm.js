import { useAppContext } from '../context/appContext';

const CreateTripForm = () => {
  const {
    handleChange,
    theme,
    themeOptions,
    destination,
    nbTravelers,
    duration,
    cost,
    activities,
    advices,
    createTrip,
  } = useAppContext();

  const handleTripInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !duration || !cost) {
      alert('missing values');
      return;
    }
    createTrip();
  };
  return (
    <form className='mt-5'>
      <div className='shadow sm:rounded-md'>
        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
          <div className='flex flex-col md:flex-row flex-wrap gap-5'>
            <div className='flex flex-col gap-2 border rounded-xl p-5'>
              <label htmlFor='' className='text-black'>
                Destination <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='destination'
                value={destination}
                onChange={handleTripInput}
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
                name='theme'
                value={theme}
                onChange={handleTripInput}
                className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
                {themeOptions.map((item, index) => {
                  return (
                    <option key={index} value={item} className=''>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='flex flex-col gap-2 border rounded-xl p-5'>
              <label htmlFor='' className='text-black'>
                Duration (in days) <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                min='0'
                name='duration'
                value={duration}
                onChange={handleTripInput}
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
                  <input
                    type='number'
                    name='nbTravelers'
                    min='1'
                    onChange={handleTripInput}
                    value={nbTravelers.adults}
                  />
                </div>
              </div>
              <div className='flex gap-4 text-black'>
                <label htmlFor=''>Children</label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    name='nbTravelers'
                    min='0'
                    onChange={handleTripInput}
                    value={nbTravelers.children}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 border rounded-xl p-5'>
              <label htmlFor='' className='text-black'>
                Cost (in euros) <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                min='0'
                name='cost'
                value={cost}
                onChange={handleTripInput}
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
              name='activities'
              value={activities}
              cols='30'
              rows='5'
              onChange={handleTripInput}
              className='text-black'></textarea>
          </div>
          <div className='flex flex-col gap-2 border rounded-xl p-5'>
            <label htmlFor='' className='text-black'>
              Advices
            </label>
            <textarea
              name='advices'
              value={advices}
              cols='30'
              rows='5'
              onChange={handleTripInput}
              className='text-black'></textarea>
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn bg-orange-500'>
              Create Trip
            </button>
            <button type='button' className='btn btn-danger bg-red-500'>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CreateTripForm;
