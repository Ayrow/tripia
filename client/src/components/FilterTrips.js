import { useState } from 'react';

const FilterTrips = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSorting, setToggleSorting] = useState(false);

  return (
    <div className='my-10 mx-5'>
      <div className='flex justify-end gap-5'>
        <button type='button' className='btn bg-orange-600 hover:bg-orange-500'>
          Filter
        </button>
        <button type='button' className='btn bg-orange-600 hover:bg-orange-500'>
          Sort By
        </button>
      </div>
    </div>
  );
};
export default FilterTrips;
