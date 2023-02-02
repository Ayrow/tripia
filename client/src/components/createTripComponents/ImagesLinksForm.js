import { useEffect, useState } from 'react';

const ImagesLinksForm = ({ handleTripChange, images }) => {
  const [imageLink, setImageLink] = useState('');
  const [imagesArray, setImagesArray] = useState([]);

  const addLinktoImagesSet = () => {
    const linkExists = imagesArray.find((image) => image === imageLink);

    if (!imageLink) {
      alert('Please enter a url');
    } else if (!imageLink.includes('.') && !imageLink.includes('https://')) {
      alert('please enter a correct url');
    } else if (linkExists) {
      alert('this image is already added');
      setImageLink('');
    } else {
      let newImagesArray = [...imagesArray, imageLink];
      handleTripChange({ name: 'images', value: newImagesArray });
      setImagesArray(newImagesArray);
      setImageLink('');
    }
  };

  const removeImage = (imageIndex) => {
    let newArray = imagesArray.filter((_, index) => index !== imageIndex);
    handleTripChange({ name: 'images', value: imagesArray });
    setImagesArray(newArray);
  };

  useEffect(() => {
    setImagesArray(images);
  }, [images]);

  return (
    <div className=' text-black w-full'>
      <div className='flex flex-wrap gap-2'>
        <input
          className='border border-black w-1/4 px-2 py-1'
          placeholder='https://www.image.com/azerty'
          type='url'
          name='image'
          onChange={(e) => setImageLink(e.target.value)}
          value={imageLink}
        />
        <button
          className='p-2 border border-black'
          type='button'
          onClick={addLinktoImagesSet}>
          OK
        </button>
      </div>
      <div className='mt-5 flex flex-col gap-2'>
        {imagesArray.map((image, index) => {
          return (
            <div key={index} className='flex gap-3 items-center'>
              <img src={image} alt={`${index}`} width='100px' height='100px' />
              <p>{image}</p>
              <button
                className='text-red-600 text-lg'
                type='button'
                onClick={() => removeImage(index)}>
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ImagesLinksForm;
