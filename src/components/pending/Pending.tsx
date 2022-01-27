import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserSelector, setLogout } from '~/store/slices/auth';
import { ROUTE_PATH } from '~/routes/path';
import { useCheckUserRoleQuery } from '~/api/auth';
import { Loading } from '../common';
import { useEffect } from 'react';

const Pending = () => {
  const user = useSelector(authUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userRole } = useCheckUserRoleQuery(user?.id, {
    pollingInterval: 5000,
  });

  const handleRedirect = () => {
    dispatch(setLogout());
    navigate(ROUTE_PATH.ROOT);
  };

  useEffect(() => {
    if (userRole !== undefined && userRole.role !== 'Pending') {
      handleRedirect();
    }
  }, [userRole]);

  return (
    <div className='container pending'>
      <b className='pending__title'>Waiting to sign up.</b>
      <div className='pending__loading'>
        <Loading />
      </div>
    </div>
  );
};

export default Pending;