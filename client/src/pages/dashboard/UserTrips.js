import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTripForm from '../../components/CreateTripForm';
import Loading from '../../components/Loading';
import { useAppContext } from '../../context/app/appContext';
import { useTripContext } from '../../context/trip/tripContext';
import { FaUser, FaHeart, FaChild } from 'react-icons/fa';
import ConfirmationModal from '../../components/ConfirmationModal';

const UserTrips = () => {
  const navigate = useNavigate();

  const { isConfirmationModalOpen, openModalConfirm, isLoading } =
    useAppContext();

  const {
    userTrips,
    getUserTrips,
    deleteTrip,
    itemID,
    editUserTrip,
    cancelTripEdition,
  } = useTripContext();

  const [toggleCreateForm, setToggleCreateForm] = useState(false);

  const seeTrip = (id) => {
    cancelTripEdition();
    navigate(`/explore/${id}`);
  };

  const editTrip = async (id) => {
    navigate(`/explore/${id}`);
    editUserTrip(id);
  };

  useEffect(() => {
    getUserTrips();
  }, []);

  return (
    <div className='relative'>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          deleteItem={deleteTrip}
          itemID={itemID}
          setToggleCreateForm
        />
      )}
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

      {isLoading && (
        <div className='mt-10'>
          <Loading center={true} />
        </div>
      )}
      <div className='flex w-full flex-wrap gap-5 mt-5 p-5'>
        {userTrips.map((trip, index) => {
          const {
            destination,
            theme,
            duration,
            cost,
            nbTravelers,
            likes,
            images,
            _id,
          } = trip;
          return (
            <div
              key={index}
              className='w-full h-80 rounded-2xl shadow-lg'
              style={{
                //  backgroundImage: `url(${images[0]})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
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
                    onClick={() => seeTrip(_id)}>
                    See
                  </button>
                  <button
                    className='btn btn-success px-6'
                    onClick={() => editTrip(_id)}>
                    Edit
                  </button>
                  <button
                    className='btn btn-danger bg-red-500'
                    onClick={() =>
                      openModalConfirm({
                        id: _id,
                        text: 'Are you sure you want to delete this trip?',
                        title: 'Remove Trip',
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
export default UserTrips;
