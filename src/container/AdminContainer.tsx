import { Outlet } from 'react-router-dom';

const AdminContainer = () => {
  return (
    <div className='container'>
      <Outlet />
    </div>
  );
};

export default AdminContainer;
