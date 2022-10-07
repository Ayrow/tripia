import { useState } from 'react';
import { useAppContext } from '../context/app/appContext';
import { useTripContext } from '../context/trip/tripContext';

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

  const handleSearch = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
    console.log('value', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <div className='my-10 mx-5'>
      <div className='flex flex-wrap-reverse sm:justify-end gap-5'>
        <button
          type='button'
          className='btn bg-orange-600 hover:bg-orange-500'
          onClick={() => setToggleFilter(!toggleFilter)}>
          Filter
        </button>
        <div className=' btn cursor-default bg-orange-600 hover:bg-orange-500 flex gap-2 items-center'>
          Sort By
          <select
            name='sort'
            onChange={handleSearch}
            value={sort}
            className='inline-flex w-52 py-2 px-3 rounded-md capitalize
                shadow-sm focus:outline-none focus:ring-primary-500
                focus:border-primary-500 border bg-white border-black text-black cursor-pointer'>
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

      {toggleFilter && (
        <form className='border border-orange-500 rounded-xl mt-5 bg-slate-100 shadow-lg'>
          <h4 className='text-center my-5 text-black uppercase'>
            Filter Trips
          </h4>
          <div className=' px-10 pt-4'>
            <div className='flex gap-10 flex-row justify-around flex-wrap'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='' className='text-black'>
                  Search Destination
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
          </div>
          <div className='flex justify-end mr-10'>
            <button
              className='btn btn-danger my-5'
              disabled={isLoading}
              onClick={handleSubmit}>
              clear filters
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default FilterTrips;
