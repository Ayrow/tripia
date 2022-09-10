import { FaHeart, FaUser } from 'react-icons/fa';

const TravelCard = ({
  image,
  location,
  theme,
  travellers,
  duration,
  likes,
  cost,
}) => {
  return (
    <div
      className=' w-full h-80 '
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className=' w-full grid row-span-1 pt-5 bg-black h-full bg-opacity-50'>
        <div className='grid grid-cols-2 px-5 '>
          <h3 className=' flex text-3xl'>{location}</h3>
          <div className='flex flex-col gap-2 place-items-end'>
            <p className='flex gap-2 items-center'>
              {travellers} <FaUser />
            </p>
            <p className='flex gap-2 items-center'>
              {likes} <FaHeart className=' text-red-600' />
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center text-xl'>
          <p>Theme: {theme}</p>
          <p>{duration}</p>
        </div>
        <div className='text-3xl text-center'>{cost} €</div>
      </div>
    </div>
  );
};
export default TravelCard;
