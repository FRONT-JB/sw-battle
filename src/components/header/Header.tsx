import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';
import { LogoIcons } from '../common';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__top'>
        <h1 className='logo'>
          <Link className='logo__link' to={ROUTE_PATH.ROOT}>
            <span className='blind'>SW BATTLE</span>
            <LogoIcons />
          </Link>
        </h1>
      </div>
      <nav className='nav'>
        <ul className='gnb'>
          <li className='gnb__item'>
            <Link className='gnb__item__link' to={ROUTE_PATH.ROOT}>
              <i className='icon icon-battle'></i>
              <span className='blind'>Battle</span>
            </Link>
          </li>
          <li className='gnb__item'>
            <Link className='gnb__item__link' to={ROUTE_PATH.DEFENSE}>
              <i className='icon icon-defense'></i>
              <span className='blind'>Defense</span>
            </Link>
          </li>
        </ul>
        <button type='button' className='btn btn-create'>
          <i className='icon icon-admin'></i>
          <span className='blind'>Admin</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;