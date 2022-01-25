import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';
import { authUserSelector } from '~/store/slices/auth';

const Navigation = () => {
  const user = useSelector(authUserSelector);
  const isAdmin = user?.role === 'Admin';
  return (
    <nav className='nav'>
      <ul className='gnb'>
        <li className='gnb__item'>
          <Link className='gnb__item__link' to={ROUTE_PATH.ROOT}>
            <i className='icon icon-battle'></i>
            <span className='blind'>Battle</span>
          </Link>
        </li>
        {isAdmin && (
          <li className='gnb__item'>
            <Link className='gnb__item__link' to={ROUTE_PATH.ADMIN}>
              <i className='icon icon-admin'></i>
              <span className='blind'>Admin</span>
            </Link>
            <div></div>
          </li>
        )}
        <li className='gnb__item'>
          <Link className='gnb__item__link' to={ROUTE_PATH.CREATE}>
            <i className='icon icon-create'></i>
            <span className='blind'>Create</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navigation);
