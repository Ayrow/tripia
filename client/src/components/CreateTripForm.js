import { useAppContext } from '../context/appContext';
import Alert from './Alert';

const CreateTripForm = ({ setToggleCreateForm }) => {
  const {
    handleChange,
    theme,
    themeOptions,
    destination,
    nbAdults,
    nbChildren,
    duration,
    cost,
    activities,
    advices,
    costDetails,
    travelDetail,
    travelCost,
    accomodationDetail,
    accomodationCost,
    leisureDetail,
    leisureCost,
    createTrip,
    clearTripForm,
    showAlert,
    displayAlert,
  } = useAppContext();

  const handleTripInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !duration || !cost) {
      displayAlert({
        type: 'danger',
        msg: 'Please fill in the missing fields',
      });
      return;
    }
    createTrip();
    setToggleCreateForm(false);
  };
  return (
    <form className='mt-5 sm:p-7'>
      <div className='shadow sm:rounded-md'>
        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
          {showAlert && <Alert />}
          <div className='flex flex-col md:flex-row flex-wrap justify-around'>
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
              <h3 htmlFor='' className='text-black'>
                Travelers
              </h3>
              <div className='flex gap-4 text-black'>
                <label htmlFor=''>Adults</label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    name='nbAdults'
                    min='1'
                    onChange={handleTripInput}
                    value={nbAdults}
                  />
                </div>
              </div>
              <div className='flex gap-4 text-black'>
                <label htmlFor=''>Children</label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    name='nbChildren'
                    min='0'
                    onChange={handleTripInput}
                    value={nbChildren}
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
            <h3 className='text-black'>Cost details</h3>
            <div className='flex justify-around flex-wrap gap-4'>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Travel expenses (car, airplane tickets, train...)
                </label>
                <textarea
                  name='travelDetail'
                  value={travelDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black list-disc'></textarea>
                <input
                  type='number'
                  name='travelCost'
                  value={travelCost}
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Accomodation
                </label>
                <textarea
                  name='accomodationDetail'
                  value={accomodationDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black list-item'></textarea>
                <input
                  type='number'
                  name='accomodationCost'
                  value={accomodationCost}
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Leisure
                </label>
                <textarea
                  name='leisureDetail'
                  value={leisureDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black'></textarea>
                <input
                  type='number'
                  name='leisureCost'
                  value={leisureCost}
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
              </div>
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
              className='border border-black text-black'></textarea>
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
              className='border border-black text-black'></textarea>
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn bg-orange-500'>
              Create Trip
            </button>
            <button
              type='button'
              onClick={clearTripForm}
              className='btn btn-danger bg-red-500'>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CreateTripForm;
