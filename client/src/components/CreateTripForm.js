import { useEffect } from 'react';
import { useAppContext } from '../context/app/appContext';
import { useTripContext } from '../context/trip/tripContext';
import Alert from './Alert';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateTripForm = ({ setToggleCreateForm }) => {
  const { showAlert, displayAlert } = useAppContext();

  const {
    singleTrip,
    themeOptions,
    createTrip,
    clearTripForm,
    handleTripChange,
  } = useTripContext();

  const {
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

  const handleQuillInput = (targetName, targetValue) => {
    handleTripChange({ name: targetName, value: targetValue });
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

          <div className='flex flex-col gap-2 border border-slate-600 rounded-xl p-5'>
            <h3 className='text-black text-center uppercase text-lg font-semibold'>
              Cost details
            </h3>
            <div className='flex flex-col flex-wrap gap-5 mt-10'>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Travel expenses (car, airplane tickets, train...)
                </label>
                <div className='w-full'>
                  <ReactQuill
                    name='costDetails.travel.travelDetail'
                    value={costDetails.travel.travelDetail}
                    onChange={(value) =>
                      handleQuillInput('costDetails.travel.travelDetail', value)
                    }
                    className=' text-black'
                  />
                  <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
                    <label className='text-black w-full'>Cost (in euros)</label>
                    <input
                      type='number'
                      name='costDetails.travel.travelCost'
                      value={costDetails.travel.travelCost}
                      id=''
                      onChange={handleTripInput}
                      className='text-center text-black'
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-col '>
                <label className='text-black'>Accomodation</label>
                <div className='w-full'>
                  <ReactQuill
                    name='costDetails.accomodation.accomodationDetail'
                    value={costDetails.accomodation.accomodationDetail}
                    onChange={(value) =>
                      handleQuillInput(
                        'costDetails.accomodation.accomodationDetail',
                        value
                      )
                    }
                    className=' text-black'
                  />
                  <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
                    <label className='text-black w-full'>Cost (in euros)</label>
                    <input
                      type='number'
                      name='costDetails.accomodation.accomodationCost'
                      value={costDetails.accomodation.accomodationCost}
                      id=''
                      onChange={handleTripInput}
                      className=' text-center text-black'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='text-black'>
                  Leisure
                </label>
                <div className='w-full'>
                  <ReactQuill
                    name='costDetails.leisure.leisureDetail'
                    value={costDetails.leisure.leisureDetail}
                    onChange={(value) =>
                      handleQuillInput(
                        'costDetails.leisure.leisureDetail',
                        value
                      )
                    }
                    className=' text-black'
                  />
                  <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
                    <label className='text-black w-full'>Cost (in euros)</label>
                    <input
                      type='number'
                      name='costDetails.leisure.leisureCost'
                      value={costDetails.leisure.leisureCost}
                      id=''
                      onChange={handleTripInput}
                      className='text-center text-black'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 border rounded-xl p-5'>
            <label htmlFor='' className='text-black'>
              Activities
            </label>
            <ReactQuill
              name='activities'
              value={activities}
              onChange={(value) => handleQuillInput('activities', value)}
              className='border border-black text-black'
            />
          </div>
          <div className='flex flex-col gap-2 border rounded-xl p-5'>
            <label htmlFor='' className='text-black'>
              Advices
            </label>
            <ReactQuill
              name='advices'
              value={advices}
              onChange={(value) => handleQuillInput('advices', value)}
              className='border border-black text-black'
            />
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
