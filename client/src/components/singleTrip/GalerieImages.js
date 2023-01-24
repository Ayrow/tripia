import { useEffect, useState } from 'react';

const GalerieImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(true);

  const defaultImage =
    'https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg';

  return (
    <div className=''>
      <img src={images[0] || defaultImage} alt='' />
      <div className='flex gap-2  justify-between pt-4'>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              className='w-1/5 cursor-pointer'
              src={image || defaultImage}
              alt=''
            />
          );
        })}
      </div>
    </div>
  );
};
export default GalerieImages;
