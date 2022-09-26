import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';

const SingleTrip = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    summary: true,
    activities: false,
    costDetails: false,
    advices: false,
  };

  const [toggleTab, setToggleTab] = useState(initialState);

  const toggling = (e) => {
    setToggleTab({ [e.target.name]: true });
  };

  const { getSingleTrip, singleTrip } = useAppContext();

  const {
    destination,
    theme,
    duration,
    cost: totalCost,
    activities,
    advices,
    nbTravelers: { adults, children } = {},
    costDetails: {
      travel: { travelDetail, travelCost } = {},
      accomodation: { accomodationDetail, accomodationCost } = {},
      leisure: { leisureDetail, leisureCost } = {},
    } = {},
  } = singleTrip;

  useEffect(() => {
    getSingleTrip(id);
  }, [id]);

  return (
    <div className='my-5 mx-2'>
      <button
        type='button'
        onClick={() => navigate(-1)}
        className='btn bg-orange-600 flex items-center gap-2 mb-3'>
        <FaArrowLeft /> Go Back
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-2  gap-5'>
        <div className=''>
          <img
            src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
            alt=''
          />
          <div className='flex gap-2 flex-wrap justify-between pt-4'>
            <img
              src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
              alt=''
              className=' w-1/5 lg:w-52'
            />
            <img
              src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
              alt=''
              className='w-1/5'
            />
            <img
              src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
              alt=''
              className='w-1/5'
            />
            <img
              src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
              alt=''
              className='w-1/5'
            />
          </div>
        </div>
        <div className='relative flex flex-col bg-white'>
          <div className=' bg-blue-700 flex justify-between p-5 text-xl'>
            <h3 className='text-2xl'>{destination}</h3>
            <button className='flex items-center gap-2 btn border'>
              <FaHeart /> Save
            </button>
          </div>
          <div className=' bg-slate-600 flex justify-around '>
            <button
              name='summary'
              className='w-full border border-slate-200 active:bg-slate-900'
              onClick={toggling}>
              Summary
            </button>
            <button
              name='activities'
              className='w-full border border-slate-200 active:bg-slate-900'
              onClick={toggling}>
              Activities
            </button>
            <button
              name='costDetails'
              className='w-full border border-slate-200 active:bg-slate-900'
              onClick={toggling}>
              Cost Details
            </button>
            <button
              name='advices'
              className='w-full border border-slate-200 active:bg-slate-900'
              onClick={toggling}>
              Advices
            </button>
          </div>
          <div className='relative text-black flex flex-col gap-7 p-5 text-lg'>
            {toggleTab.summary && (
              <>
                <div className='flex gap-2 items-center'>
                  <h4 className=' font-bold border-b-2 w-fit border-orange-500 '>
                    Theme:
                  </h4>
                  <p>{theme}</p>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=' '>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <h4 className=' font-bold border-b-2 w-fit border-orange-500'>
                    Duration:{' '}
                  </h4>
                  <p>{duration} days</p>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=''>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div>
                  <h4 className=' font-bold border-b-2 w-fit border-orange-500 mb-2'>
                    Travelers:
                  </h4>
                  <div>
                    <p>
                      - {adults} {adults > 1 ? 'adults' : 'adult'}
                    </p>
                    <p>
                      - {children} {children > 1 ? 'children' : 'child'}
                    </p>
                  </div>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=''>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <h4 className=' font-bold text-xl uh4percase'>
                    Total cost:{' '}
                  </h4>
                  <p>{totalCost}€</p>
                </div>
              </>
            )}

            {toggleTab.activities && <p>{activities}</p>}
            {toggleTab.costDetails && (
              <div className='flex flex-col gap-5'>
                <div>
                  <h4 className='  text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
                    Travel
                  </h4>
                  <p>Details : {travelDetail}</p>
                  <p>Cost: {travelCost}€</p>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=''>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div>
                  <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
                    Accomodation
                  </h4>
                  <p>Details : {accomodationDetail}</p>
                  <p>Cost: {accomodationCost}€</p>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=''>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div>
                  <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
                    Leisure
                  </h4>
                  <p>Details : {leisureDetail}</p>
                  <p>Cost: {leisureCost}€</p>
                </div>
                <div className='block' aria-hidden='true'>
                  <div className=''>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <p className=' font-bold uppercase text-xl'>
                  Total: {travelCost + accomodationCost + leisureCost}€
                </p>
              </div>
            )}
            {toggleTab.advices && <p>{advices}</p>}
          </div>
          <div className='h-full w-full flex items-end'>
            <button type='button' className='btn bg-orange-600 mb-5 ml-5 flex'>
              Share By Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
