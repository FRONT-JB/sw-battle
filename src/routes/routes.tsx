import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/slices/auth';
import MainRoute from './MainRoutes';
import AuthRoute from './AuthRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  const { token, user } = useSelector(authSelector);
  return (
    <Router>
      {token && user?.role !== 'Pending' ? <MainRoute /> : <AuthRoute />}
      <ToastContainer />
    </Router>
  );
};

export default AppRoutes;
