const GalerieImages = () => {
  return (
    <div className=''>
      <img
        src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
        alt=''
      />
      <div className='flex gap-2 flex-wrap justify-between pt-4'>
        <img
          src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
          alt=''
          className=' w-1/5 lg:w-52'
        />
        <img
          src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
          alt=''
          className='w-1/5'
        />
        <img
          src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
          alt=''
          className='w-1/5'
        />
        <img
          src='https://europeupclose.com/wp-content/uploads/2017/04/iceland-1751463_1280.jpg'
          alt=''
          className='w-1/5'
        />
      </div>
    </div>
  );
};
export default GalerieImages;
