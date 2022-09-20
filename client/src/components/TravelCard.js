import { FaHeart, FaUser, FaChild } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TravelCard = ({
  image,
  destination,
  theme,
  nbTravelers,
  duration,
  likes,
  cost,
  _id,
}) => {
  return (
    <Link
      to={`/explore/${_id}`}
      className='w-full h-80 rounded-2xl shadow-lg'
      style={{
        // backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className=' w-full grid row-span-1 pt-5 bg-black h-full bg-opacity-60 rounded-2xl'>
        <div className='grid grid-cols-2 px-5 '>
          <h3 className=' flex text-3xl'>{destination}</h3>
          <div className='flex flex-col gap-2 place-items-end'>
            <div className='flex gap-7 text-lg'>
              <p className='flex items-center gap-1'>
                {nbTravelers.adults}
                <FaUser />
              </p>
              <p className='flex items-center gap-1'>
                {nbTravelers.children}
                <FaChild />
              </p>
            </div>

            <p className='flex gap-2 items-center text-xl'>
              {likes} <FaHeart className=' text-red-600' />
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center text-center text-xl pt-3 gap-7'>
          <p>Theme: {theme}</p>
          <p>Duration: {duration} Days</p>
        </div>
        <div className='text-2xl flex place-items-center justify-center py-5'>
          <p className='bg-orange-500 bg-opacity-70 text-center rounded-lg flex justify-center px-3 py-1'>
            {cost} €
          </p>
        </div>
      </div>
    </Link>
  );
};
export default TravelCard;
