import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/trip/tripContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import GalerieImages from '../components/singleTrip/GalerieImages';
import ButtonTab from '../components/ButtonTab';
import SummaryTab from '../components/singleTrip/SummaryTab';
import CostDetailsTab from '../components/singleTrip/CostDetailsTab';
import { useUserContext } from '../context/user/userContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SingleTrip = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const {
    itemID,
    getSingleTrip,
    singleTrip,
    isEditing,
    editUserTrip,
    themeOptions,
    updateTrip,
    cancelTripEdition,
    handleTripChange,
    saveTrip,
    removeSavedTrip,
    savedTripsID,
    textColor,
    textContent,
  } = useTripContext();

  const initialState = {
    summary: true,
    activities: false,
    costDetails: false,
    advices: false,
  };

  const [toggleTab, setToggleTab] = useState(initialState);
  const [toggleSave, setToggleSave] = useState(savedTripsID.includes(id));

  const togglingTab = (e) => {
    e.preventDefault();
    setToggleTab({ [e.target.name]: true });
  };

  const {
    theme,
    destination,
    duration,
    cost,
    images,
    activities,
    advices,
    nbTravelers,
    costDetails,
  } = singleTrip;

  const handleTripInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    handleTripChange(name, value);
  };

  const handleQuillInput = (targetName, targetValue) => {
    handleTripChange(targetName, targetValue);
  };

  const navigateBack = () => {
    cancelTripEdition(id);
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip();
  };

  const handleTripSave = (id) => {
    if (toggleSave) {
      setToggleSave(false);
      const tripID = { itemID: id };
      removeSavedTrip(tripID);
    } else {
      setToggleSave(true);
      saveTrip(id);
    }
  };

  useEffect(() => {
    getSingleTrip(id);
  }, [id]);

  return (
    <div className='my-5 mx-2'>
      <button
        type='button'
        onClick={navigateBack}
        className='btn bg-orange-600 flex items-center gap-2 mb-3'>
        <FaArrowLeft /> Go Back
      </button>

      <div className='grid grid-cols-1 sm:grid-cols-2  gap-5'>
        <GalerieImages images={images} />

        <form className='relative flex flex-col bg-white'>
          <div className=' bg-blue-700 flex flex-wrap gap-5 justify-between p-5 text-xl'>
            <h3 className='text-2xl'>
              {isEditing ? (
                <input
                  type='text'
                  name='destination'
                  value={destination}
                  onChange={handleTripInput}
                  className='block w-52 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
                />
              ) : (
                destination
              )}
            </h3>
            <div className='flex gap-5'>
              {user && singleTrip.createdBy === user._id ? (
                <div>
                  {isEditing ? (
                    <div className='flex gap-5'>
                      <button
                        type='submit'
                        className='btn bg-green-600 hover:bg-green-400 flex'
                        onClick={handleSubmit}>
                        save
                      </button>
                      <button
                        type='button'
                        className='btn border bg-red-500 hover:bg-red-400'
                        onClick={() => cancelTripEdition(itemID)}>
                        Cancel
                      </button>
                    </div>
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
                  type='button'
                  className='bg-orange-600 flex items-center gap-2 btn border'
                  onClick={() => {
                    handleTripSave(id);
                  }}>
                  <FaHeart className={`${textColor} bg-w`} />
                  {textContent}
                </button>
              )}
            </div>
          </div>
          <div className=' bg-slate-600 flex justify-around '>
            <ButtonTab name='summary' toggling={togglingTab} />
            <ButtonTab name='activities' toggling={togglingTab} />
            <ButtonTab
              name='costDetails'
              btnText='cost details'
              toggling={togglingTab}
            />
            <ButtonTab name='advices' toggling={togglingTab} />
          </div>

          <div className='relative text-black flex flex-col gap-7 p-5 text-lg'>
            {toggleTab.summary && (
              <SummaryTab
                theme={theme}
                duration={duration}
                adults={nbTravelers.adults}
                children={nbTravelers.children}
                cost={cost}
                themeOptions={themeOptions}
                isEditing={isEditing}
                handleTripInput={handleTripInput}
              />
            )}

            {toggleTab.activities && (
              <div>
                {isEditing ? (
                  <ReactQuill
                    theme='snow'
                    name='activities'
                    rows='8'
                    value={activities}
                    onChange={(value) => handleQuillInput('activities', value)}
                    className='box-border w-full border border-black text-black'
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: activities }}></div>
                )}
              </div>
            )}

            {toggleTab.costDetails && (
              <CostDetailsTab
                travelDetail={costDetails.travel.travelDetail}
                travelCost={costDetails.travel.travelCost}
                accomodationDetail={costDetails.accomodation.accomodationDetail}
                accomodationCost={costDetails.accomodation.accomodationCost}
                leisureCost={costDetails.leisure.leisureCost}
                leisureDetail={costDetails.leisure.leisureDetail}
                isEditing={isEditing}
                handleTripInput={handleTripInput}
                handleQuillInput={handleQuillInput}
              />
            )}
            {toggleTab.advices && (
              <div>
                {isEditing ? (
                  <ReactQuill
                    name='advices'
                    value={advices}
                    rows='8'
                    onChange={(value) => handleQuillInput('advices', value)}
                    className=' box-border w-full border border-black text-black'
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: advices }}></div>
                )}
              </div>
            )}
          </div>
          <div className='h-full w-full flex items-end'>
            {!isEditing && (
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
