import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import UnknownUser from '../assets/images/unknown-user.png';
import userLinks from '../utils/userlinks';

const DropdownUserBtn = ({ username, logoutUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate('/');
  };

  const ref = useRef();

  const toggleDropdown = (e) => {
    if (ref.current && showDropdown && !ref.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  document.addEventListener('click', toggleDropdown);

  return (
    <div ref={ref} className='relative'>
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
        <div className='absolute grid grid-cols-1 items-center bg-white text-black w-screen'>
          {userLinks.map((link) => {
            const { id, text, path, icon } = link;
            return (
              <Link
                key={id}
                to={path}
                className='flex gap-2 capitalize p-3 hover:bg-slate-300'>
                {icon} {text}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className='flex gap-2 p-3 hover:bg-slate-300 items-center'>
            <FaSignOutAlt /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};
export default DropdownUserBtn;
