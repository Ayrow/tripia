import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useTripContext } from '../context/tripContext';

const FilterTrips = () => {
  const { isLoading } = useAppContext();
  const {
    themeOptions,
    clearFilters,
    search,
    theme,
    handleChange,
    sort,
    sortOptions,
  } = useTripContext();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSorting, setToggleSorting] = useState(false);

  const handleSearch = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

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

      <form className='border rounded-xl'>
        <h4 className='text-center mt-'>Filter Trips</h4>
        <div className=' p-10'>
          <div className='flex gap-10 '>
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-black'>
                Search
              </label>
              <input
                className='block w-52 py-1 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'
                type='text'
                name='search'
                onChange={handleSearch}
                value={search}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-black'>
                Theme
              </label>
              <select
                name='theme'
                onChange={handleSearch}
                value={theme}
                className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
                <option hidden></option>
                {themeOptions.map((item, index) => {
                  return (
                    <option key={index} value={item} className=''>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className='btn btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </div>
  );
};
export default FilterTrips;
