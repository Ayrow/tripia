import LineBreak from '../LineBreak';

const SummaryTab = ({ theme, duration, adults, children, totalCost }) => {
  return (
    <>
      <div className='flex gap-2 items-center'>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500 '>
          Theme:
        </h4>

        <p>{theme}</p>
      </div>
      <LineBreak />
      <div className='flex gap-2 items-center'>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500'>
          Duration:{' '}
        </h4>
        <p>{duration} days</p>
      </div>
      <LineBreak />
      <div>
        <h4 className=' font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Travelers:
        </h4>
        <div>
          <p>
            - {adults} {adults > 1 ? 'adults' : 'adult'}
          </p>
          <p>
            - {children} {children > 1 ? 'children' : 'child'}
          </p>
        </div>
      </div>
      <LineBreak />
      <div className='flex gap-2'>
        <h4 className=' font-bold text-xl uh4percase'>Total cost: </h4>
        <p>{totalCost}€</p>
      </div>
    </>
  );
};
export default SummaryTab;
