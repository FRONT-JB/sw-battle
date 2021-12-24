import { MonsterList } from '~/constants/monster';
import { handleTimeForToday } from '~/utils/time';

const AttackResult = () => {
  return (
    <li className='attack-result__item'>
      <div className='defense-info'>
        <div className='defense-info__monster'>
          <span className='img-box'>
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
          <span className='img-box'>
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
          <span className='img-box'>
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
        </div>
        <div className='defense-info__creator'>
          <span className='date'>{handleTimeForToday(new Date(1640333278000))}</span>
          <span className='creator-id'>쿠와앙</span>
        </div>
      </div>
    </li>
  );
};

export default AttackResult;
