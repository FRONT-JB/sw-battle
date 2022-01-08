import { Link } from 'react-router-dom';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import MonsterImage from '../common/MonsterImage';

const DefenseList = () => {
  const { data: boardList } = useGetBoardListQuery({});
  const isNotNullList = !!boardList?.length;
  return (
    <div className='defense-list'>
      {!isNotNullList && <p style={{ height: '100%' }}>No Result</p>}
      {isNotNullList && (
        <ul className='defense-list-card'>
          {boardList?.map(({ id, keyword, content, user, created_at }) => (
            <li className='defense-list-card__list' key={created_at}>
              <Link
                className='defense-list-card__list__link'
                to={`${ROUTE_PATH.DETAIL}/${id}`}
              >
                {content?.defense?.map((monster) => (
                  <MonsterImage
                    key={monster.com2us_id}
                    monsterName={monster.name}
                    imageName={monster.image_filename}
                    alt={`${monster.name} Thumbnail`}
                  />
                ))}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DefenseList;
