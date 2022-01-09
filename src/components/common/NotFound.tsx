import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  icon?: ReactNode;
  pathName: string;
  label?: string;
}

const NotFound = ({ icon, pathName, label = '' }: Props) => {
  return (
    <div className='not-found'>
      <Link className='not-found__message' to={pathName}>
        {icon}
        {label}
      </Link>
    </div>
  );
};

export default NotFound;
