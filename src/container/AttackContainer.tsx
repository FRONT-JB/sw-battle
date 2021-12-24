import { useDispatch, useSelector } from 'react-redux';
import { AttackFilter, AttackResult } from '~/components/battle';

const AttackContainer = () => {
  const dispatch = useDispatch();

  return (
    <div className='container'>
      <b className='title' style={{ display: 'block' }}>
        Attack Units
      </b>

      <AttackFilter />

      <div className='content'>
        <ul className='attack-result'>
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
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
