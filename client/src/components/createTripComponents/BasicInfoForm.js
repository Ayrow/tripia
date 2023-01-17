import { useEffect } from 'react';

const BasicInfoForm = ({
  destination,
  handleTripInput,
  duration,
  nbTravelers,
  themeOptions,
}) => {
  useEffect(() => {}, []);
  return (
    <div className='flex flex-col md:flex-row flex-wrap justify-around gap-5'>
      <div className='flex flex-col gap-2 border rounded-xl p-5'>
        <label htmlFor='' className='text-black'>
          Destination <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='destination'
          value={destination}
          onChange={handleTripInput}
          placeholder='Europe, South America, Spain...'
          className='block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
        />
      </div>
      <div className='flex flex-col gap-2 border rounded-xl p-5'>
        <label htmlFor='' className='text-black'>
          Theme <span className='text-red-500'>*</span>
        </label>
        <select
          name='theme'
          defaultValue='Select A Theme'
          onChange={handleTripInput}
          className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
          <option hidden>Select A Theme</option>
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
        <h3 htmlFor='' className='text-black'>
          Travelers
        </h3>
        <div className='flex gap-4 text-black'>
          <label htmlFor=''>Adults</label>
          <div className='flex gap-2'>
            <input
              type='number'
              name='nbTravelers.adults'
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
              name='nbTravelers.children'
              min='0'
              onChange={handleTripInput}
              defaultValue={0}
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
          defaultValue={0}
          onChange={handleTripInput}
          className=' block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
        />
      </div>
    </div>
  );
};
export default BasicInfoForm;
