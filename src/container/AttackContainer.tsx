import { useGetMonsterQuery } from '~/api/monster';
import { AttackFilter, AttackResult } from '~/components/battle';
import { handleCurrentDate } from '~/utils/time';

const AttackContainer = () => {
  const { data } = useGetMonsterQuery(1);
  return (
    <div className='container'>
      <div className='content-header'>
        <b className='content-header__title'>Attack Units</b>
        <span className='content-header__date'>{handleCurrentDate()}</span>
      </div>
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
