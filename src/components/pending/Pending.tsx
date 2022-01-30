import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserSelector, setLogout } from '~/store/slices/auth';
import { ROUTE_PATH } from '~/routes/path';
import { useCheckUserRoleQuery } from '~/api/auth';
import { Loading } from '../common';
import { useEffect } from 'react';
import useToastify from '~/hooks/useToastify';
import { TOASTIFY_ALERT } from '~/constants/toastify';

const Pending = () => {
  const user = useSelector(authUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToast } = useToastify();
  const { data: userRole } = useCheckUserRoleQuery(user?.id, {
    pollingInterval: 5000,
  });

  const handleRedirect = () => {
    dispatch(setLogout());
    navigate(ROUTE_PATH.ROOT);
    setToast(TOASTIFY_ALERT.SUCCESS('Permission allowed'), 10000);
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
