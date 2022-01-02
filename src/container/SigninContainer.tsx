import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SigninForm } from '~/components/form';
import { ROUTE_PATH } from '~/routes/path';
import { tokenSelector } from '~/store/slices/auth';

const SigninContainer = () => {
  const token = useSelector(tokenSelector);
  return token ? <Navigate to={ROUTE_PATH.ROOT} /> : <SigninForm />;
};

export default SigninContainer;
