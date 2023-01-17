import { useEffect } from 'react';
import { useAppContext } from '../context/app/appContext';
import { useTripContext } from '../context/trip/tripContext';
import {
  ActivitiesAdvicesForm,
  BasicInfoForm,
  DetailedCostsForm,
  ImagesLinksForm,
} from './createTripComponents/index';
import Alert from './Alert';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateTripForm = ({ setToggleCreateForm }) => {
  const { showAlert, displayAlert } = useAppContext();

  const {
    singleTrip,
    themeOptions,
    createTrip,
    clearTripForm,
    handleTripChange,
  } = useTripContext();

  const {
    theme,
    destination,
    duration,
    cost,
    activities,
    advices,
    nbTravelers,
    costDetails,
  } = singleTrip;

  const handleTripInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleTripChange({ name, value });
  };

  const handleQuillInput = (targetName, targetValue) => {
    handleTripChange({ name: targetName, value: targetValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !destination ||
      !duration ||
      duration === 0 ||
      !cost ||
      cost === 0 ||
      theme === 'Select A Theme' ||
      !theme
    ) {
      displayAlert({
        type: 'danger',
        msg: 'Some mandatory fields have not been filled',
      });
      return;
    }
    createTrip();
    setToggleCreateForm(false);
  };

  useEffect(() => {
    clearTripForm();
  }, []);

  return (
    <form className='mt-5 sm:p-7'>
      <div className='shadow sm:rounded-md'>
        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
          {showAlert && <Alert />}

          <BasicInfoForm
            destination={destination}
            handleTripInput={handleTripInput}
            themeOptions={themeOptions}
            duration={duration}
            nbTravelers={nbTravelers}
          />

          <DetailedCostsForm
            costDetails={costDetails}
            handleQuillInput={handleQuillInput}
            handleTripInput={handleTripInput}
          />

          <ActivitiesAdvicesForm
            activities={activities}
            advices={advices}
            handleQuillInput={handleQuillInput}
          />

          <ImagesLinksForm />

          <div className='flex gap-2 justify-end'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn bg-orange-500'>
              Create Trip
            </button>
            <button
              type='button'
              onClick={clearTripForm}
              className='btn btn-danger bg-red-500'>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CreateTripForm;
