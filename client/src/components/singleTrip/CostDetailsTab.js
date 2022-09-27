import LineBreak from '../LineBreak';

const CostDetailsTab = ({
  travelDetail,
  travelCost,
  accomodationDetail,
  accomodationCost,
  leisureCost,
  leisureDetail,
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h4 className='  text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Travel
        </h4>
        <p>Details : {travelDetail}</p>
        <p>Cost: {travelCost}€</p>
      </div>
      <LineBreak />
      <div>
        <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Accomodation
        </h4>
        <p>Details : {accomodationDetail}</p>
        <p>Cost: {accomodationCost}€</p>
      </div>
      <LineBreak />
      <div>
        <h4 className=' text-xl font-bold border-b-2 w-fit border-orange-500 mb-2'>
          Leisure
        </h4>
        <p>Details : {leisureDetail}</p>
        <p>Cost: {leisureCost}€</p>
      </div>
      <LineBreak />
      <p className=' font-bold uppercase text-xl'>
        Total: {travelCost + accomodationCost + leisureCost}€
      </p>
    </div>
  );
};
export default CostDetailsTab;
