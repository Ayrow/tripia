import Hero from '../assets/images/landing-hero.svg';

const HeroLanding = () => {
  return (
    <header className='flex'>
      <div className='p-20'>
        <h2 className=' text-3xl'>Find and share your new adventure</h2>
        <p className='py-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
          possimus veniam. Impedit, sed reiciendis. Consequatur ducimus quis
          nisi, id beatae reprehenderit delectus corrupti similique, veritatis
          fuga aliquam, consequuntur fugit voluptatum!
        </p>
        <button className='btn'>Explore</button>
      </div>
      <div className='hidden md:flex w-1/2'>
        <img src={Hero} alt='hero' className='' />
      </div>
    </header>
  );
};
export default HeroLanding;
