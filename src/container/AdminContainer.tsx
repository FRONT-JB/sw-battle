import NavigateBar from '~/components/common/NavigateBar';
import { ContentHeader } from '~/components/header';
import { SearchBox } from '~/components/search';
import SearchSelect from '~/components/search/SearchSelect';

const AdminContainer = () => {
  return (
    <div className='container'>
      <NavigateBar />
      <ContentHeader title='Create Defense Units' />
      <div className='content'>
        <SearchBox />
        <SearchSelect />
      </div>
    </div>
  );
};

export default AdminContainer;
