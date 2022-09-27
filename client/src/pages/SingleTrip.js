import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import GalerieImages from '../components/singleTrip/GalerieImages';
import ButtonTab from '../components/ButtonTab';
import LineBreak from '../components/LineBreak';
import SummaryTab from '../components/singleTrip/SummaryTab';
import CostDetailsTab from '../components/singleTrip/CostDetailsTab';

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

  const {
    getSingleTrip,
    singleTrip,
    isEditing,
    editUserTrip,
    user,
    handleChange,
    themeOptions,
    cancelTripEdition,
  } = useAppContext();

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
    console.log(isEditing);
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

        <div className='relative flex flex-col bg-white'>
          <div className=' bg-blue-700 flex justify-between p-5 text-xl'>
            <h3 className='text-2xl'>{destination}</h3>
            <div className='flex gap-5'>
              {singleTrip.createdBy === user._id ? (
                <div>
                  {isEditing ? (
                    <button
                      className='flex items-center gap-2 btn border bg-red-500 hover:bg-red-400'
                      onClick={cancelTripEdition}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      className='flex items-center gap-2 btn border'
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
                duration={duration}
                adults={adults}
                children={children}
                totalCost={totalCost}
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
            <button type='button' className='btn bg-orange-600 my-5 ml-5 flex'>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
