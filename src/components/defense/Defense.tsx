import { ContentHeader } from '../header';
import DefenseFilter from './DefenseFilter';
import DefenseList from './DefenseList';

const Defense = () => {
  return (
    <div className='defense'>
      <ContentHeader title='Choose from the list' />
      <DefenseFilter />
      <DefenseList />
    </div>
  );
};

export default Defense;
