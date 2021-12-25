import { MonsterList } from '~/constants/monster';
import { handleTimeForToday } from '~/utils/time';
import { Badge } from '../common';

const AttackResult = () => {
  return (
    <li className='attack-result__item'>
      <div className='defense-info-monster'>
        <span className='img-box'>
          <img
            src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
          />
        </span>
        <span className='img-box'>
          <img
            src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[1].image_filename}`}
          />
        </span>
        <span className='img-box'>
          <img
            src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[2].image_filename}`}
          />
        </span>
      </div>
      <div className='defense-info-creator'>
        <span className='defense-info-creator__date'>{handleTimeForToday(1640333278000)}</span>
        <span className='defense-info-creator__user-id'>쿠와앙</span>
        <div className='defense-info-creator__elements'>
          <Badge
            element={MonsterList.results[0].element as 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark'}
          />
          <Badge
            element={MonsterList.results[0].element as 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark'}
          />
          <Badge
            element={MonsterList.results[0].element as 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark'}
          />
        </div>
      </div>
    </li>
  );
};

export default AttackResult;
