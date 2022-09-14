import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

const Profile = () => {
  const { user } = useAppContext();
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  return <div></div>;
};
export default Profile;
