const register = async (req, res) => {
  res.status(200).json({ msg: 'register' });
};

const login = async (req, res) => {
  res.status(200).json({ msg: 'login' });
};

const updateUser = async (req, res) => {
  res.status(200).json({ msg: 'login' });
};

export { register, login, updateUser };
