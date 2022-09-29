import LineBreak from '../LineBreak';

const SummaryTab = ({
  theme,
  cost,
  duration,
  adults,
  children,
  isEditing,
  handleTripInput,
  themeOptions,
  nbAdults,
  nbChildren,
}) => {
  return (
    <>
      <div className='flex gap-2 items-center'>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500 '>
          Theme:
        </h4>

        {isEditing ? (
          <select
            name='theme'
            defaultValue={theme}
            onChange={handleTripInput}
            className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
            {themeOptions.map((item, index) => {
              return (
                <option key={index} value={item} className=''>
                  {item}
                </option>
              );
            })}
          </select>
        ) : (
          <p>{theme}</p>
        )}
      </div>
      <LineBreak />
      <div className='flex gap-2 items-center'>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500'>
          Duration:{' '}
        </h4>
        {isEditing ? (
          <p className='flex gap-5 items-center'>
            <input
              type='number'
              min='0'
              name='duration'
              defaultValue={duration}
              onChange={handleTripInput}
              className=' block w-20 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
            />{' '}
            days
          </p>
        ) : (
          <p>{duration} days</p>
        )}
      </div>
      <LineBreak />
      <div>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Travelers:
        </h4>
        {isEditing ? (
          <div>
            <p className='flex gap-5'>
              {' '}
              <input
                className='w-20'
                type='number'
                name='nbAdults'
                min='1'
                onChange={handleTripInput}
                defaultValue={nbAdults}
              />{' '}
              adults
            </p>
            <p className='flex gap-5'>
              <input
                className='w-20'
                type='number'
                name='nbChildren'
                min='1'
                onChange={handleTripInput}
                defaultValue={nbChildren}
              />
              children
            </p>
          </div>
        ) : (
          <div>
            <p>
              - {adults} {adults > 1 ? 'adults' : 'adult'}
            </p>
            <p>
              - {children} {children > 1 ? 'children' : 'child'}
            </p>
          </div>
        )}
      </div>
      <LineBreak />
      <div className='flex items-center gap-2'>
        <h4 className=' font-bold text-xl uh4percase '>Total cost: </h4>
        {isEditing ? (
          <p className='flex items-center gap-5'>
            {' '}
            <input
              type='number'
              min='0'
              name='cost'
              defaultValue={cost}
              onChange={handleTripInput}
              className=' block w-28 py-2 px-3 rounded-md
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border border-black text-black'
            />
            €
          </p>
        ) : (
          <p>{cost}€</p>
        )}
      </div>
    </>
  );
};
export default SummaryTab;
