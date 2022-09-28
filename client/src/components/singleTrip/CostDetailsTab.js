import LineBreak from '../LineBreak';

const CostDetailsTab = ({
  travelDetail,
  travelCost,
  accomodationDetail,
  accomodationCost,
  leisureCost,
  leisureDetail,
  isEditing,
  handleTripInput,
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h4 className='  text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Travel
        </h4>

        {isEditing ? (
          <div className='flex flex-wrap gap-5'>
            <div className=' flex flex-col'>
              Detail:{' '}
              <textarea
                name='travelDetail'
                cols='30'
                rows='5'
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='travelCost'
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Details : {travelDetail}</p>
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
          <div className='flex flex-wrap gap-5'>
            <div className=' flex flex-col'>
              Detail:{' '}
              <textarea
                name='accomodationDetail'
                value={accomodationDetail}
                cols='30'
                rows='5'
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='accomodationCost'
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Details : {accomodationDetail}</p>
            <p>Cost: {accomodationCost}€</p>
          </div>
        )}
      </div>
      <LineBreak />
      <div>
        <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Leisure
        </h4>
        {isEditing ? (
          <div className='flex flex-wrap gap-5'>
            <div className=' flex flex-col'>
              Detail:{' '}
              <textarea
                name='leisureDetail'
                cols='30'
                rows='5'
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='leisureCost'
                  id=''
                  onChange={handleTripInput}
                  className='border border-black text-black'
                />
                €
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Details : {leisureDetail}</p>
            <p>Cost: {leisureCost}€</p>
          </div>
        )}
      </div>
      <LineBreak />
      <p className=' font-bold uppercase text-xl'>
        Total: {travelCost + accomodationCost + leisureCost}€
      </p>
    </div>
  );
};
export default CostDetailsTab;
