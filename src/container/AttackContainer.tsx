import { AttackResult } from '~/components/battle';
import { ContentHeader } from '~/components/header';

const AttackContainer = () => {
  return (
    <div className='container'>
      <ContentHeader title='Attack Units' />
      <div className='content'>
        <AttackResult />
      </div>
    </div>
  );
};

export default AttackContainer;
