import { AttackFilter } from '~/components/battle';
import { MonsterList } from '~/constants/monster';

const AttackContainer = () => {
  return (
    <div className='container'>
      <div className='content'>
        <b className='title' style={{ display: 'block' }}>
          Attack Units
        </b>
        {MonsterList.results.map((monster) => {
          return (
            <span
              style={{
                display: 'inline-block',
                borderRadius: '20px',
                overflow: 'hidden',
                width: '25%',
              }}
              key={monster.id}
            >
              <img
                src={`https://swarfarm.com/static/herders/images/monsters/${monster.image_filename}`}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AttackContainer;
