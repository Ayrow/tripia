import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { useTripContext } from '../../context/tripContext';
import { FaUser, FaChild, FaHeart } from 'react-icons/fa';
import ConfirmationModal from '../../components/ConfirmationModal';

const SavedTrips = () => {
  const navigate = useNavigate();
  const { getAllSavedTrips, savedTrips, removeSavedTrip } = useTripContext();
  const { openModalConfirm, isConfirmationModalOpen } = useAppContext();

  useEffect(() => {
    getAllSavedTrips();
  }, []);

  return (
    <div>
      {isConfirmationModalOpen && (
        <ConfirmationModal deleteItem={removeSavedTrip} setToggleCreateForm />
      )}
      <div className=''>
        <h2 className='text-center text-2xl mb-10 pt-4'>Saved trips</h2>
      </div>

      <div className='flex w-full flex-wrap gap-5 mt-5 p-3'>
        {savedTrips.map((trip, index) => {
          const {
            destination,
            theme,
            duration,
            cost,
            nbTravelers,
            likes,
            _id,
          } = trip;
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
                  <button
                    className='btn btn-hipster flex items-center px-6'
                    onClick={() => navigate(`/explore/${_id}`)}>
                    See
                  </button>
                  <button
                    className='btn btn-danger bg-red-500'
                    onClick={() =>
                      openModalConfirm({
                        id: _id,
                        text: 'Are you sure you want to delete this saved trip?',
                        title: 'Remove Trip from saved',
                        editType: 'Delete',
                        passwordValidation: false,
                      })
                    }>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SavedTrips;
