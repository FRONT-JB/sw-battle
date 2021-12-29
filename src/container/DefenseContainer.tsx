import { NotFound } from '~/components/common';
import { ROUTE_PATH } from '~/routes/path';
import { handleIcon } from '~/utils/image';

const DefenseContainer = () => {
  return (
    <div className='container'>
      <NotFound
        icon={handleIcon('home')}
        pathName={ROUTE_PATH.ROOT}
        label='Not Found'
      />
    </div>
  );
};

export default DefenseContainer;
