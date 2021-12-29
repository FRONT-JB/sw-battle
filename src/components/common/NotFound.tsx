import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RoutePathTypes, ROUTE_PATH } from '~/routes/path';

interface Props {
  icon?: ReactNode;
  pathName: RoutePathTypes;
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
