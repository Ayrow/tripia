import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ActivitiesAdvicesForm = ({ activities, advices, handleQuillInput }) => {
  return (
    <div className=''>
      <div className='flex flex-col gap-2 border rounded-xl p-5'>
        <label htmlFor='' className='text-black'>
          Activities
        </label>
        <ReactQuill
          name='activities'
          value={activities}
          onChange={(value) => handleQuillInput('activities', value)}
          className='border border-black text-black'
        />
      </div>
      <div className='flex flex-col gap-2 border rounded-xl p-5'>
        <label htmlFor='' className='text-black'>
          Advices
        </label>
        <ReactQuill
          name='advices'
          value={advices}
          onChange={(value) => handleQuillInput('advices', value)}
          className='border border-black text-black'
        />
      </div>
    </div>
  );
};
export default ActivitiesAdvicesForm;
