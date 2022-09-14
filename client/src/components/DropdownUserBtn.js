import { useState } from 'react';
import { Link } from 'react-router-dom';
import UnknownUser from '../assets/images/unknown-user.png';

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
        <div className='absolute'>
          <p>test</p>
        </div>
      )}
    </div>
  );
};
export default DropdownUserBtn;
