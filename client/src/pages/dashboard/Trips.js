import { useEffect } from 'react';
import CreateTripForm from '../../components/CreateTripForm';
import { useAppContext } from '../../context/appContext';
import { FaUser, FaHeart } from 'react-icons/fa';

const Trips = () => {
  const { userTrips, getUserTrips } = useAppContext();

  useEffect(() => {
    getUserTrips();
    console.log(userTrips);
  }, []);

  return (
    <div className='p-7'>
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
      <CreateTripForm />
      <div className='flex w-full flex-wrap gap-2 mt-5'>
        {userTrips.map((trip, index) => {
          const { destination, theme, duration, cost, image, likes } = trip;
          return (
            <div
              key={index}
              className='w-full h-80 rounded-2xl shadow-lg'
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className=' w-full grid row-span-1 pt-5 bg-black h-full bg-opacity-60 rounded-2xl'>
                <div className='grid grid-cols-2 px-5 '>
                  <h3 className=' flex text-3xl'>{destination}</h3>
                  <div className='flex flex-col gap-2 place-items-end'>
                    <p className='flex gap-2 items-center'>
                      {2} <FaUser />
                    </p>
                    <p className='flex gap-2 items-center'>
                      {likes} <FaHeart className=' text-red-600' />
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-center text-xl'>
                  <p>Theme: {theme}</p>
                  <p>{duration} Days</p>
                </div>
                <div className='text-3xl flex place-items-center justify-center'>
                  <p className='bg-orange-500 bg-opacity-70 w-1/4 text-center rounded-lg'>
                    {cost} €
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Trips;
