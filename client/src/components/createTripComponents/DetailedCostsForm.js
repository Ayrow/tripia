import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DetailedCostsForm = ({
  costDetails,
  handleQuillInput,
  handleTripInput,
}) => {
  return (
    <div className='flex flex-col flex-wrap gap-5 mt-10'>
      <div className='flex flex-col'>
        <label htmlFor='' className='text-black'>
          Travel expenses (car, airplane tickets, train...)
        </label>
        <div className='w-full'>
          <ReactQuill
            name='costDetails.travel.travelDetail'
            value={costDetails.travel.travelDetail}
            onChange={(value) =>
              handleQuillInput('costDetails.travel.travelDetail', value)
            }
            className=' text-black'
          />
          <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
            <label className='text-black w-full'>Cost (in euros)</label>
            <input
              type='number'
              name='costDetails.travel.travelCost'
              value={costDetails.travel.travelCost}
              id=''
              onChange={handleTripInput}
              className='text-center text-black'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col '>
        <label className='text-black'>Accomodation</label>
        <div className='w-full'>
          <ReactQuill
            name='costDetails.accomodation.accomodationDetail'
            value={costDetails.accomodation.accomodationDetail}
            onChange={(value) =>
              handleQuillInput(
                'costDetails.accomodation.accomodationDetail',
                value
              )
            }
            className=' text-black'
          />
          <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
            <label className='text-black w-full'>Cost (in euros)</label>
            <input
              type='number'
              name='costDetails.accomodation.accomodationCost'
              value={costDetails.accomodation.accomodationCost}
              id=''
              onChange={handleTripInput}
              className=' text-center text-black'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <label htmlFor='' className='text-black'>
          Leisure
        </label>
        <div className='w-full'>
          <ReactQuill
            name='costDetails.leisure.leisureDetail'
            value={costDetails.leisure.leisureDetail}
            onChange={(value) =>
              handleQuillInput('costDetails.leisure.leisureDetail', value)
            }
            className=' text-black'
          />
          <div className='flex w-1/4 gap-10 border border-gray-400 px-2'>
            <label className='text-black w-full'>Cost (in euros)</label>
            <input
              type='number'
              name='costDetails.leisure.leisureCost'
              value={costDetails.leisure.leisureCost}
              id=''
              onChange={handleTripInput}
              className='text-center text-black'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailedCostsForm;
