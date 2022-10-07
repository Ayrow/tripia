import LineBreak from '../LineBreak';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CostDetailsTab = ({
  travelDetail,
  travelCost,
  accomodationDetail,
  accomodationCost,
  leisureCost,
  leisureDetail,
  isEditing,
  handleTripInput,
  handleQuillInput,
}) => {
  const totalCost =
    parseInt(travelCost) + parseInt(accomodationCost) + parseInt(leisureCost);

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h4 className='  text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Travel
        </h4>

        {isEditing ? (
          <div className=''>
            <div className=' flex flex-col'>
              Detail:{' '}
              <ReactQuill
                theme='snow'
                name='costDetails.travel.travelDetail'
                value={travelDetail}
                onChange={(value) =>
                  handleQuillInput('costDetails.travel.travelDetail', value)
                }
                className=' text-black'
              />
            </div>
            <div className='flex gap-10'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.travel.travelCost'
                  id=''
                  value={travelCost}
                  onChange={handleTripInput}
                  className=' text-black w-1/2'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>Details:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: travelDetail,
                }}
              />
            </div>
            <p>Cost: {travelCost}€</p>
          </div>
        )}
      </div>
      <LineBreak />
      <div>
        <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Accomodation
        </h4>
        {isEditing ? (
          <div className=''>
            <div className=' flex flex-col'>
              Detail:{' '}
              <ReactQuill
                name='costDetails.accomodation.accomodationDetail'
                value={accomodationDetail}
                onChange={(value) =>
                  handleQuillInput(
                    'costDetails.accomodation.accomodationDetail',
                    value
                  )
                }
                className=' text-black'
              />
            </div>
            <div className=' flex gap-10'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.accomodation.accomodationCost'
                  id=''
                  value={accomodationCost}
                  onChange={handleTripInput}
                  className='w-1/2 text-black'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>Details:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: accomodationDetail,
                }}
              />
            </div>

            <p className='mt-5'>Cost: {accomodationCost || 0}€</p>
          </div>
        )}
      </div>
      <LineBreak />
      <div>
        <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Leisure
        </h4>
        {isEditing ? (
          <div className=''>
            <div className=' flex flex-col'>
              Detail:{' '}
              <ReactQuill
                name='costDetails.leisure.leisureDetail'
                value={leisureDetail}
                onChange={(value) =>
                  handleQuillInput('costDetails.leisure.leisureDetail', value)
                }
                className=' text-black'
              />
            </div>
            <div className=' flex gap-10'>
              Cost:
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.leisure.leisureCost'
                  id=''
                  value={leisureCost || 0}
                  onChange={handleTripInput}
                  className=' text-black w-1/2'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>Details:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: leisureDetail,
                }}
              />
            </div>
            <p className='mt-5'>Cost: {leisureCost}€</p>
          </div>
        )}
      </div>
      <LineBreak />
      <p className=' font-bold uppercase text-xl'>
        Total: <span>{totalCost ? totalCost : 0}€</span>
      </p>
    </div>
  );
};
export default CostDetailsTab;
