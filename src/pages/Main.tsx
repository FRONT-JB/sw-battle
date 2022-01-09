import { Outlet } from 'react-router-dom';
import { Sidebar } from '~/components/sidebar';

const Main = () => {
  return (
    <div className='wrapper'>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Main;
