import { useState } from 'react';
import { Link } from 'react-router-dom';
import UnknownUser from '../assets/images/unknown-user.png';
import userLinks from '../utils/userlinks';

const DropdownUserBtn = ({ username, logoutUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='relative'>
      <button
        className='flex btn gap-2 place-items-center'
        onClick={() => setShowDropdown(!showDropdown)}>
        <img
          src={UnknownUser}
          alt='unknown'
          width={'30px'}
          height={'30px'}
          className='rounded-full'
        />
        {username}
      </button>
      {showDropdown && (
        <div className='absolute grid grid-cols-1 gap-2 bg-white text-black w-full'>
          {userLinks.map((link) => {
            const { id, text, path, icon } = link;
            return (
              <Link key={id} to={path} className='flex capitalize gap-2'>
                {icon} {text}
              </Link>
            );
          })}
          <button onClick={logoutUser} className='text-left'>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
export default DropdownUserBtn;
