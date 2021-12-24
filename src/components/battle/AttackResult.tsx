import { MonsterList } from '~/constants/monster';

const AttackResult = () => {
  return (
    <li className='attack-result__item'>
      <div className='defense-info'>
        <div className='defense-info__monster'>
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              borderRadius: '20px',
              overflow: 'hidden',
              width: '25%',
            }}
          >
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              borderRadius: '20px',
              overflow: 'hidden',
              width: '25%',
            }}
          >
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              borderRadius: '20px',
              overflow: 'hidden',
              width: '25%',
            }}
          >
            <img
              style={{ width: '100%' }}
              src={`https://swarfarm.com/static/herders/images/monsters/${MonsterList.results[0].image_filename}`}
            />
          </span>
        </div>
        <div className='defense-info__creator'>
          <p className='date'>2021.12.24</p>
          <p className='creator-id'>creator</p>
          <p className='length'>+ 3</p>
        </div>
      </div>
    </li>
  );
};

export default AttackResult;
