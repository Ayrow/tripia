import { FaHeart, FaSuitcase, FaUserEdit, FaChalkboard } from 'react-icons/fa';

const links = [
  {
    id: 1,
    text: 'dashboard',
    path: '/dashboard/',
    icon: <FaChalkboard />,
  },
  {
    id: 2,
    text: 'manage account',
    path: '/dashboard/settings',
    icon: <FaUserEdit />,
  },
  {
    id: 3,
    text: 'my trips',
    path: '/dashboard/my-trips',
    icon: <FaSuitcase />,
  },
  {
    id: 4,
    text: 'saved',
    path: '/dashboard/saved-trips',
    icon: <FaHeart />,
  },
];

export default links;
