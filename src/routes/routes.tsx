import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/slices/auth';
import MainRoute from './MainRoutes';
import AuthRoute from './AuthRoute';
import ModalContainer from '~/container/ModalContainer';

const AppRoutes = () => {
  const { token } = useSelector(authSelector);
  return (
    <Router>
      {token ? <MainRoute /> : <AuthRoute />}
      <ModalContainer />
    </Router>
  );
};

export default AppRoutes;
