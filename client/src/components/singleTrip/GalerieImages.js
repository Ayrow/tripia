import { useState } from 'react';
import { useTripContext } from '../../context/trip/tripContext';

const GalerieImages = ({ images }) => {
  const { isEditing } = useTripContext();
  const [mainImage, setMainImage] = useState('');

  const defaultImage =
    'https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg';

  return (
    <div className=''>
      <div>
        <img
          src={mainImage || images[0] || defaultImage}
          alt=''
          className=' object-contain w-full h-96'
        />
        <div className='flex gap-4 justify-between py-4 overflow-x-scroll scroll-auto'>
          {images.map((image, index) => {
            return (
              <img
                key={index}
                src={image || defaultImage}
                alt=''
                onClick={() => setMainImage(image)}
                className='w-48 h-48 object-cover cursor-pointer rounded-lg'
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default GalerieImages;
