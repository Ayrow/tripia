import { useState } from 'react';
import { useTripContext } from '../../context/trip/tripContext';
import ImagesLinksForm from '../createTripComponents/ImagesLinksForm';

const GalerieImages = ({ images }) => {
  const { isEditing } = useTripContext();
  const [mainImage, setMainImage] = useState('');

  const { handleTripChange } = useTripContext();

  const defaultImage =
    'https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg';

  const multipleImages = images.length > 1 ? 'h-96' : 'h-full';

  return (
    <div className=''>
      {isEditing ? (
        <ImagesLinksForm images={images} handleTripChange={handleTripChange} />
      ) : (
        <div>
          <img
            src={mainImage || images[0] || defaultImage}
            alt=''
            className={`object-contain w-full ${multipleImages}  `}
          />

          {images.length > 0 && (
            <div className='relative w-full h-auto flex gap-4 justify-between py-4 overflow-x-scroll'>
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
          )}
        </div>
      )}
    </div>
  );
};
export default GalerieImages;
