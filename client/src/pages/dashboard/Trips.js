import { useEffect, useState } from 'react';
import CreateTripForm from '../../components/CreateTripForm';
import { useAppContext } from '../../context/appContext';
import { FaUser, FaHeart, FaChild } from 'react-icons/fa';

const Trips = () => {
  const { userTrips, getUserTrips } = useAppContext();

  const [toggleCreateForm, setToggleCreateForm] = useState(false);

  useEffect(() => {
    getUserTrips();
  }, []);

  return (
    <div className=''>
      <div className=''>
        <h2 className='text-center text-2xl mb-10 pt-4'>My trips</h2>
      </div>
      <div className='flex justify-center mt-2'>
        <button
          type='button'
          onClick={() => setToggleCreateForm(!toggleCreateForm)}
          className='flex btn gap-2 place-items-center bg-orange-500'>
          {toggleCreateForm ? 'Hide Form' : 'Add a new trip'}
        </button>
      </div>
      {toggleCreateForm && (
        <CreateTripForm setToggleCreateForm={setToggleCreateForm} />
      )}
      <div className='flex w-full flex-wrap gap-5 mt-5 p-3'>
        {userTrips.map((trip, index) => {
          const { destination, theme, duration, cost, nbTravelers, likes } =
            trip;
          return (
            <div
              key={index}
              className='w-full h-80 rounded-2xl shadow-lg'
              style={{
                // backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className=' w-full grid row-span-1 pt-5 bg-black h-full bg-opacity-60 rounded-2xl'>
                <div className='grid grid-cols-2 px-5 '>
                  <h3 className=' flex text-3xl'>{destination}</h3>
                  <div className='flex flex-col gap-2 place-items-end'>
                    <div className='flex gap-7 text-lg'>
                      <p className='flex items-center gap-1'>
                        {nbTravelers.adults}
                        <FaUser />
                      </p>
                      <p className='flex items-center gap-1'>
                        {nbTravelers.children}
                        <FaChild />
                      </p>
                    </div>

                    <p className='flex gap-2 items-center text-xl'>
                      {likes} <FaHeart className=' text-red-600' />
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-center text-xl pt-3 gap-2'>
                  <p>Theme: {theme}</p>
                  <p>{duration} Days</p>
                </div>
                <div className='text-2xl flex place-items-center justify-center py-5'>
                  <p className='bg-orange-500 bg-opacity-70 text-center rounded-lg flex justify-center px-3 py-1'>
                    {cost} €
                  </p>
                </div>
                <div className='flex gap-5 justify-end pr-5 py-5 text-xl'>
                  <button className='btn btn-hipster px-6'>See</button>
                  <button className='btn btn-success px-6'>Edit</button>
                  <button className='btn btn-danger bg-red-500'>Delete</button>
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
