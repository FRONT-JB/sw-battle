import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTE_PATH } from './path';
import { Auth, Main } from '~/pages';
import {
  AdminContainer,
  AttackContainer,
  DefenseContainer,
  DetailContainer,
  SigninContainer,
  SignupContainer,
} from '~/container';
import ModalContainer from '~/container/ModalContainer';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/slices/auth';

const AppRoutes = () => {
  const { token } = useSelector(authSelector);
  return (
    <Router>
      <Routes>
        {token ? (
          <Route path={ROUTE_PATH.ROOT} element={<Main />}>
            <Route index element={<AttackContainer />} />
            <Route path={ROUTE_PATH.DETAIL}>
              <Route path={ROUTE_PATH.PARAMS} element={<DetailContainer />} />
            </Route>
            <Route path={ROUTE_PATH.DEFENSE} element={<DefenseContainer />} />
            <Route path={ROUTE_PATH.ADMIN} element={<AdminContainer />} />
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
