import { useDispatch } from 'react-redux';
import { setLogout } from '~/store/slices/auth';
import { LogoIcons } from '../common';
import { Navigation } from '../nav';

const Sidebar = () => {
  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(setLogout());
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__nav'>
        <LogoIcons />
        <Navigation />
      </div>
      <div className='sidebar__utils'>
        <button type='button' className='btn' onClick={handleLogout}>
          <i className='icon icon-logout'></i>
          <span className='blind'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
