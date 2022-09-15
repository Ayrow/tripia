import { FaHeart, FaSuitcase, FaUserEdit, FaChalkboard } from 'react-icons/fa';

const links = [
  {
    id: 1,
    text: 'dashboard',
    path: '/dashboard',
    icon: <FaChalkboard />,
  },
  {
    id: 2,
    text: 'manage account',
    path: 'settings',
    icon: <FaUserEdit />,
  },
  {
    id: 3,
    text: 'trips',
    path: 'trips',
    icon: <FaSuitcase />,
  },
  {
    id: 4,
    text: 'saved',
    path: 'saved',
    icon: <FaHeart />,
  },
];

export default links;
