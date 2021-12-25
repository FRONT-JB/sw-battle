import { Outlet } from 'react-router-dom';
import { Header } from '~/components/header';

const Main = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
