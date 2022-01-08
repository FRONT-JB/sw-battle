import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTE_PATH } from './path';
import { Auth, Main } from '~/pages';
import {
  DashboardContainer,
  SigninContainer,
  SignupContainer,
} from '~/container';
import ModalContainer from '~/container/ModalContainer';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/slices/auth';
import { Comment } from '~/components/comment';
import { Create } from '~/components/create';

const AppRoutes = () => {
  const { token } = useSelector(authSelector);
  return (
    <Router>
      <Routes>
        {token ? (
          <Route path={ROUTE_PATH.ROOT} element={<Main />}>
            <Route path={ROUTE_PATH.ROOT} element={<DashboardContainer />}>
              <Route index element={<Comment />} />
              <Route path={ROUTE_PATH.CREATE} element={<Create />} />
              <Route path={ROUTE_PATH.DETAIL}>
                <Route path={ROUTE_PATH.PARAMS} element={<Comment />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to={ROUTE_PATH.ROOT} />} />
          </Route>
        ) : (
          <Route path={ROUTE_PATH.ROOT} element={<Auth />}>
            <Route index element={<SigninContainer />} />
            <Route path={ROUTE_PATH.SIGNUP} element={<SignupContainer />} />
            <Route path='*' element={<Navigate to={ROUTE_PATH.ROOT} />} />
          </Route>
        )}
      </Routes>
      <ModalContainer />
    </Router>
  );
};

export default AppRoutes;
