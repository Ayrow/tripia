import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { FaHeart } from 'react-icons/fa';

const SingleTrip = () => {
  let { id } = useParams();
  const { getSingleTrip, singleTrip } = useAppContext();
  const { destination, likes, theme, duration, nbTravelers, cost } = singleTrip;

  useEffect(() => {
    getSingleTrip(id);
    console.log('trip', singleTrip);
  }, [id]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 my-5 mx-2 gap-5'>
      <div>
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
      <div className='flex flex-col bg-white'>
        <div className=' bg-blue-700 flex justify-between p-5 text-xl'>
          <h3>{destination}</h3>
          <p className='flex items-center gap-2'>
            {likes}
            <FaHeart />
          </p>
        </div>
        <div className='text-black flex flex-col gap-5 p-5 text-lg'>
          <p>Theme: {theme}</p>
          <p>Duration: {duration} days</p>
          <div>
            <p>Nb of travelers:</p>
            <p>adults</p>
            <p>children</p>
          </div>
          <p>Total cost: {cost}€</p>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
