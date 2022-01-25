import { Routes, Route, Navigate } from 'react-router-dom';
import { SigninForm, SignupForm } from '~/components/form';
import { Pending } from '~/components/pending';
import { Auth } from '~/pages';
import { ROUTE_PATH } from './path';

const AuthRoute = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.ROOT} element={<Auth />}>
        <Route index element={<SigninForm />} />
        <Route path={ROUTE_PATH.SIGNUP} element={<SignupForm />} />
        <Route path={ROUTE_PATH.PENDING} element={<Pending />} />
        <Route path='*' element={<Navigate to={ROUTE_PATH.ROOT} />} />
      </Route>
    </Routes>
  );
};

export default AuthRoute;
