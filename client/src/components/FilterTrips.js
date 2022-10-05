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
    maxPrice,
  } = useTripContext();
  const [toggleFilter, setToggleFilter] = useState(false);

  const handleSearch = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
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
        <div className='btn bg-orange-600 hover:bg-orange-500'>
          Sort By
          <select
            name='sort'
            onChange={handleSearch}
            value={sort}
            className='block w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'>
            {sortOptions.map((item, index) => {
              return (
                <option key={index} value={item} className=''>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <form className='border rounded-xl mt-5'>
        <h4 className='text-center my-5'>Filter Trips</h4>
        <div className=' px-10'>
          <div className='flex gap-10 flex-row justify-around flex-wrap'>
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
                placeholder='Europe, Brazil, Italy...'
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
                <option value='' className=''>
                  Not filtering
                </option>

                {themeOptions.map((item, index) => {
                  return (
                    <option key={index} value={item} className=''>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-black'>
                Max Price
              </label>
              <input
                className='block w-52 py-1 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black'
                type='number'
                name='maxPrice'
                onChange={handleSearch}
              />
            </div>
          </div>
          <button
            className='btn btn-danger my-5'
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
