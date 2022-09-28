import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/tripContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import GalerieImages from '../components/singleTrip/GalerieImages';
import ButtonTab from '../components/ButtonTab';
import SummaryTab from '../components/singleTrip/SummaryTab';
import CostDetailsTab from '../components/singleTrip/CostDetailsTab';
import { useUserContext } from '../context/userContext';
import { useAppContext } from '../context/appContext';

const SingleTrip = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  // const { handleChange } = useAppContext();

  const {
    nbAdults,
    nbChildren,
    cost,
    showAlert,
    displayAlert,
    itemID,
    theme,
    getSingleTrip,
    singleTrip,
    isEditing,
    editUserTrip,
    themeOptions,
    cancelTripEdition,
    updateTrip,
    handleChange,
  } = useTripContext();

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

  const { user } = useUserContext();

  const {
    destination,
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

  const handleTripInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const navigateBack = () => {
    cancelTripEdition();
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip();
  };

  return (
    <div className='my-5 mx-2'>
      <button
        type='button'
        onClick={navigateBack}
        className='btn bg-orange-600 flex items-center gap-2 mb-3'>
        <FaArrowLeft /> Go Back
      </button>

      <div className='grid grid-cols-1 sm:grid-cols-2  gap-5'>
        <GalerieImages />

        <form className='relative flex flex-col bg-white'>
          <div className=' bg-blue-700 flex justify-between p-5 text-xl'>
            <h3 className='text-2xl'>
              {isEditing ? (
                <input
                  type='text'
                  name='destination'
                  onChange={handleTripInput}
                  placeholder='Europe, South America, Spain...'
                  className='block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
                />
              ) : (
                destination
              )}
            </h3>
            <div className='flex gap-5'>
              {singleTrip.createdBy === user._id ? (
                <div>
                  {isEditing ? (
                    <button
                      type='button'
                      className='flex items-center gap-2 btn border bg-red-500 hover:bg-red-400'
                      onClick={cancelTripEdition}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='flex items-center gap-2 btn border bg-orange-500 hover:bg-orange-400'
                      onClick={() => editUserTrip(singleTrip._id)}>
                      Edit
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className='flex items-center gap-2 btn border'
                  onClick={() => {}}>
                  <FaHeart /> Save
                </button>
              )}
            </div>
          </div>
          <div className=' bg-slate-600 flex justify-around '>
            <ButtonTab name='summary' toggling={toggling} />
            <ButtonTab name='activities' toggling={toggling} />
            <ButtonTab
              name='costDetails'
              btnText='cost details'
              toggling={toggling}
            />
            <ButtonTab name='advices' toggling={toggling} />
          </div>

          <div className='relative text-black flex flex-col gap-7 p-5 text-lg'>
            {toggleTab.summary && (
              <SummaryTab
                theme={theme}
                themeOptions={themeOptions}
                duration={duration}
                adults={adults}
                children={children}
                totalCost={totalCost}
                isEditing={isEditing}
                handleTripInput={handleTripInput}
                {...singleTrip}
              />
            )}

            {toggleTab.activities && <p>{activities}</p>}

            {toggleTab.costDetails && (
              <CostDetailsTab
                travelDetail={travelDetail}
                travelCost={travelCost}
                accomodationDetail={accomodationDetail}
                accomodationCost={accomodationCost}
                leisureCost={leisureCost}
                leisureDetail={leisureDetail}
              />
            )}
            {toggleTab.advices && <p>{advices}</p>}
          </div>
          <div className='h-full w-full flex items-end'>
            {isEditing ? (
              <button
                type='submit'
                className='btn bg-green-600 hover:bg-green-400 my-5 ml-5 flex'
                onClick={handleSubmit}>
                save
              </button>
            ) : (
              <button
                type='button'
                className='btn bg-orange-600 my-5 ml-5 flex'>
                Share
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default SingleTrip;
