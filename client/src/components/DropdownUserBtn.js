import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import UnknownUser from '../assets/images/unknown-user.png';
import userLinks from '../utils/userlinks';
import { useTripContext } from '../context/trip/tripContext';

const DropdownUserBtn = ({ username, logoutUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { removeSavedTripsFromLocalStorage } = useTripContext();
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    removeSavedTripsFromLocalStorage();
    navigate('/');
  };

  const ref = useRef();

  const toggleDropdown = (e) => {
    if (ref.current && showMenu && !ref.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener('click', toggleDropdown);

  return (
    <div ref={ref} className='relative'>
      <button
        className='flex btn gap-2 place-items-center'
        onClick={() => setShowMenu(!showMenu)}>
        <img src={UnknownUser} alt='unknown' className='rounded-full w-5 h-5' />
        <span className='hidden sm:flex'>{username}</span>
      </button>

      {showMenu && (
        <div className='grid fixed inset-0 sm:inset-auto sm:absolute w-full sm:w-52 sm:right-0 grid-cols-1 sm:items-center bg-gray-800 sm:bg-white sm:text-black'>
          <div className='sm:hidden flex justify-end pr-10 bg-transparent border border-transparent'>
            <button className='' onClick={() => setShowMenu(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='h-8 w-8 text-white'
                viewBox='0 0 1792 1792'>
                <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
              </svg>
            </button>
          </div>

          {userLinks.map((link) => {
            const { id, text, path, icon } = link;
            return (
              <NavLink
                key={id}
                to={path}
                onClick={() => setShowMenu(false)}
                className={({ isActive, isPending }) =>
                  isActive
                    ? 'flex items-center gap-2 capitalize p-3 text-xl sm:text-base hover:bg-slate-600 sm:hover:bg-slate-300 bg-slate-700 sm:bg-slate-200'
                    : 'flex items-center gap-2 capitalize p-3 text-xl sm:text-base hover:bg-slate-600 sm:hover:bg-slate-300'
                }>
                {icon} {text}
              </NavLink>
            );
          })}
          <button
            onClick={logout}
            className='flex gap-2 p-3 sm:hover:bg-slate-300 hover:bg-slate-600 items-center text-xl sm:text-base'>
            <FaSignOutAlt /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};
export default DropdownUserBtn;
