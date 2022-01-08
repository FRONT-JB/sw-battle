import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';

const Navigation = () => {
  return (
    <nav className='nav'>
      <ul className='gnb'>
        <li className='gnb__item'>
          <Link className='gnb__item__link' to={ROUTE_PATH.ROOT}>
            <i className='icon icon-battle'></i>
            <span className='blind'>Battle</span>
          </Link>
        </li>
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

export default Navigation;
