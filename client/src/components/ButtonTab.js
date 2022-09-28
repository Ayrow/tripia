const buttonTab = ({ toggling, name, btnText }) => {
  return (
    <button
      name={name}
      type='button'
      className='w-full border border-slate-200 active:bg-slate-900 capitalize'
      onClick={toggling}>
      {btnText ? btnText : name}
    </button>
  );
};
export default buttonTab;
