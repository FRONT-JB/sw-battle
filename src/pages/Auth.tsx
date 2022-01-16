import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='wrapper auth'>
      <Outlet />
    </div>
  );
};

export default Auth;
