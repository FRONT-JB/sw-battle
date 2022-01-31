import { Routes, Route, Navigate } from 'react-router-dom';
import { Admin } from '~/components/admin';
import { Comment } from '~/components/comment';
import { Create } from '~/components/create';
import { User } from '~/components/user';
import { AdminContainer, DashboardContainer } from '~/container';
import { Main } from '~/pages';
import { ROUTE_PATH } from './path';

const MainRoute = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.ROOT} element={<Main />}>
        <Route path={ROUTE_PATH.ROOT} element={<DashboardContainer />}>
          <Route index element={<Comment />} />
          <Route path={ROUTE_PATH.CREATE} element={<Create />} />
          <Route path={ROUTE_PATH.DETAIL}>
            <Route path={ROUTE_PATH.PARAMS} element={<Comment />} />
          </Route>
        </Route>
        <Route path={ROUTE_PATH.ADMIN} element={<AdminContainer />}>
          <Route index element={<Admin />} />
        </Route>
        <Route path='*' element={<Navigate to={ROUTE_PATH.ROOT} />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
