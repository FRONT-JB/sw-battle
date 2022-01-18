import { Outlet } from 'react-router-dom';
import { Defense } from '~/components/defense';

const DashboardContainer = () => {
  return (
    <div className='container'>
      <Defense />
      <Outlet />
    </div>
  );
};

export default DashboardContainer;
