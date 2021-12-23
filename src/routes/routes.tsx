import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from './path';
import { Main } from '~/pages';
import { AdminContainer, AttackContainer, DefenseContainer } from '~/container';

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.ROOT} element={<Main />}>
          <Route index element={<AttackContainer />} />
          <Route path={ROUTE_PATH.DEFENSE} element={<DefenseContainer />} />
          <Route path={ROUTE_PATH.ADMIN} element={<AdminContainer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRoutes;
