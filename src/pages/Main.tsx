import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Header } from '~/components/header';
import { ROUTE_PATH } from '~/routes/path';
import { tokenSelector } from '~/store/slices/auth';

const Main = () => {
  const token = useSelector(tokenSelector);

  return (
    <div className='wrapper'>
      {token ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to={ROUTE_PATH.SIGNIN} />
      )}
    </div>
  );
};

export default Main;
