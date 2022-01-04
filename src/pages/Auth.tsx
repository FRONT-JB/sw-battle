import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='wrapper'>
      <Outlet />
    </div>
  );
};

export default Auth;
