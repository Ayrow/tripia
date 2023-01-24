import { useEffect, useState } from 'react';

const ImagesLinksForm = ({ handleTripInput, images }) => {
  const [imageLink, setImageLink] = useState('');

  const addLinktoImagesSet = () => {
    if (!imageLink) {
      alert('there is no link to add');
    } else if (!imageLink.includes('.') && !imageLink.includes('https://')) {
      alert('please enter url');
    } else {
      images.push(imageLink);
      setImageLink('');
    }
  };

  useEffect(() => {
    console.log('imageLink', imageLink);
  }, [imageLink]);

  return (
    <div className=' text-black w-full'>
      <div className='flex flex-wrap gap-2'>
        <input
          className='border border-black w-1/4 px-2 py-1'
          placeholder='http://www.image.com/azerty'
          type='url'
          name='image'
          onChange={(e) => setImageLink(e.target.value)}
        />
        <button
          className='p-2 border border-black'
          type='button'
          onClick={addLinktoImagesSet}>
          OK
        </button>
      </div>
      <div className='mt-5'>
        {images.map((image) => {
          return <p>{image}</p>;
        })}
      </div>
    </div>
  );
};
export default ImagesLinksForm;
