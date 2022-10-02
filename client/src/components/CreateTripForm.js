import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useTripContext } from '../context/tripContext';
import Alert from './Alert';

const CreateTripForm = ({ setToggleCreateForm }) => {
  const { showAlert, displayAlert } = useAppContext();

  const {
    // handleChange,
    // theme,
    // themeOptions,
    // destination,
    // nbAdults,
    // nbChildren,
    // duration,
    // cost,
    // activities,
    // advices,
    // travelDetail,
    // travelCost,
    // accomodationDetail,
    // accomodationCost,
    // leisureDetail,
    // leisureCost,
    singleTrip,
    themeOptions,
    createTrip,
    clearTripForm,
    handleTripChange,
  } = useTripContext();

  const {
    _id,
    theme,
    destination,
    duration,
    cost,
    activities,
    advices,
    nbTravelers,
    costDetails,
  } = singleTrip;

  const handleTripInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleTripChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !destination ||
      !duration ||
      duration === 0 ||
      !cost ||
      cost === 0 ||
      theme === 'Select A Theme' ||
      !theme
    ) {
      displayAlert({
        type: 'danger',
        msg: 'Some mandatory fields have not been filled',
      });
      return;
    }
    createTrip();
    setToggleCreateForm(false);
  };

  useEffect(() => {
    clearTripForm();
  }, []);

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
          <div className='flex flex-col gap-2 border rounded-xl p-5'>
            <h3 className='text-black'>Cost details</h3>
            <div className='flex justify-around flex-wrap gap-4'>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Travel expenses (car, airplane tickets, train...)
                </label>
                <textarea
                  name='costDetails.travel.travelDetail'
                  value={costDetails.travel.travelDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black list-disc'></textarea>

                <input
                  type='number'
                  name='costDetails.travel.travelCost'
                  value={costDetails.travel.travelCost}
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
                  name='costDetails.accomodation.accomodationDetail'
                  value={costDetails.accomodation.accomodationDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black list-item'></textarea>
                <input
                  type='number'
                  name='costDetails.accomodation.accomodationCost'
                  value={costDetails.accomodation.accomodationCost}
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
                  name='costDetails.leisure.leisureDetail'
                  value={costDetails.leisure.leisureDetail}
                  cols='30'
                  rows='5'
                  onChange={handleTripInput}
                  className='border border-black text-black'></textarea>
                <input
                  type='number'
                  name='costDetails.leisure.leisureCost'
                  value={costDetails.leisure.leisureCost}
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
