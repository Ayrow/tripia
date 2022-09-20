import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';

const SingleTrip = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { getSingleTrip, singleTrip } = useAppContext();
  const {
    destination,
    theme,
    duration,
    cost,
    activities,

    nbTravelers: { adults, children } = {},
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
            <button
              type='button'
              className='flex items-center gap-2 btn border'>
              <FaHeart /> Save
            </button>
          </div>
          <div className=' bg-slate-600 flex justify-around '>
            <button className='w-full border border-slate-200 active:bg-slate-900'>
              Summary
            </button>
            <button className='w-full border border-slate-200 active:bg-slate-900'>
              Activities
            </button>
            <button className='w-full border border-slate-200 active:bg-slate-900'>
              Cost Details
            </button>
            <button className='w-full border border-slate-200 active:bg-slate-900'>
              Summary
            </button>
          </div>
          <div className='text-black flex flex-col gap-5 p-5 text-lg'>
            <p>Theme: {theme}</p>
            <p>Duration: {duration} days</p>
            <div>
              <p>Nb of travelers:</p>
              <p>{adults} adults</p>
              <p>{children} children</p>
            </div>
            <p>Total cost: {cost}€</p>
          </div>
          <div className='absolute z-10 bottom-5 left-5'>
            <button type='button' className='btn bg-orange-600'>
              Share By Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
