import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from './path';
import { Main } from '~/pages';
import {
  AdminContainer,
  AttackContainer,
  DefenseContainer,
  DetailContainer,
  SigninContainer,
  SignupContainer,
} from '~/container';
import ModalContainer from '~/container/ModalContainer';

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.SIGNIN} element={<SigninContainer />} />
        <Route path={ROUTE_PATH.SIGNUP} element={<SignupContainer />} />
        <Route path={ROUTE_PATH.ROOT} element={<Main />}>
          <Route index element={<AttackContainer />} />
          <Route path={ROUTE_PATH.DEFENSE} element={<DefenseContainer />} />
          <Route path={ROUTE_PATH.ADMIN} element={<AdminContainer />} />
          <Route path={ROUTE_PATH.DETAIL} element={<DetailContainer />} />
        </Route>
      </Routes>
      <ModalContainer />
    </Router>
  );
};

export default MainRoutes;
