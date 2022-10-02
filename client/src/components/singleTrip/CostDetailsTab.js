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
  const totalCost =
    parseInt(travelCost) + parseInt(accomodationCost) + parseInt(leisureCost);

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
                name='costDetails.travel.travelDetail'
                cols='30'
                rows='5'
                value={travelDetail}
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.travel.travelCost'
                  id=''
                  value={travelCost || 0}
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
            <p>Cost: {travelCost || 0}€</p>
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
                name='costDetails.accomodation.accomodationDetail'
                cols='30'
                rows='5'
                value={accomodationDetail}
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.accomodation.accomodationCost'
                  id=''
                  value={accomodationCost || 0}
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
            <p>Cost: {accomodationCost || 0}€</p>
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
                name='costDetails.leisure.leisureDetail'
                cols='30'
                rows='5'
                value={leisureDetail}
                onChange={handleTripInput}
                className='border border-black text-black'></textarea>
            </div>
            <div className=' flex flex-col'>
              Cost:{' '}
              <div className='flex gap-2'>
                {' '}
                <input
                  type='number'
                  name='costDetails.leisure.leisureCost'
                  id=''
                  value={leisureCost || 0}
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
        Total:
        {totalCost ? totalCost : 0}€
      </p>
    </div>
  );
};
export default CostDetailsTab;
