import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  icon?: ReactNode;
  pathName: string;
  label?: string;
  state?: string;
}

const NotFound = ({ icon, pathName, label = '', state = '' }: Props) => {
  return (
    <div className='not-found'>
      <Link className='not-found__message' to={pathName} state={state}>
        {icon}
        {label}
      </Link>
    </div>
  );
};

export default NotFound;
