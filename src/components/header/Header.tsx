import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';
import { setLogout } from '~/store/slices/auth';
import { LogoIcons } from '../common';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      dispatch(setLogout());
      navigate(ROUTE_PATH.ROOT, { replace: true });
    }
  };

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
        <div className='utils'>
          <Link className='link-admin' to={ROUTE_PATH.ADMIN}>
            <i className='icon icon-create'></i>
            <span className='blind'>Create</span>
          </Link>
          <button className='btn-logout' onClick={handleLogout}>
            <i className='icon icon-logout'></i>
            <span className='blind'>Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
