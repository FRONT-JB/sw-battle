import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';

const NotFound = () => {
  return (
    <div className='not-found'>
      <Link className='not-found__message' to={ROUTE_PATH.ROOT}>
        <i className='icon icon-home'></i>
        Not Found
      </Link>
    </div>
  );
};

export default NotFound;
