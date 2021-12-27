import { AttackSelect } from '~/components/admin';
import { ContentHeader } from '~/components/header';
import { SearchBox } from '~/components/search';

const AdminContainer = () => {
  return (
    <div className='container'>
      <ContentHeader title='Create Defense Units' />
      <div className='content'>
        <SearchBox />
        <AttackSelect />
      </div>
    </div>
  );
};

export default AdminContainer;
