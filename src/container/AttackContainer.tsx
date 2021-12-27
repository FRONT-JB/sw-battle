import { AttackFilter, AttackResult } from '~/components/battle';
import { ContentHeader } from '~/components/header';
import { handleCurrentDate } from '~/utils/time';

const AttackContainer = () => {
  return (
    <div className='container'>
      <ContentHeader title='Attack Units' />
      <AttackFilter />
      <div className='content'>
        <ul className='attack-result'>
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
        </ul>
      </div>
    </div>
  );
};

export default AttackContainer;
