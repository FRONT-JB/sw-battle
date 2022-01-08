import { useNavigate, useParams } from 'react-router';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import { handleTimeForToday } from '~/utils/time';
import MonsterImage from '../common/MonsterImage';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

const DefenseList = () => {
  const { data: boardList } = useGetBoardListQuery({});
  const { id: boardId } = useParams();
  const navigate = useNavigate();
  const isNotNullList = !!boardList?.length;
  const listRef = useRef<HTMLDivElement>(null);
  const handleNavigate = (id: number) => {
    navigate(`${ROUTE_PATH.DETAIL}/${id}`);
  };

  useEffect(() => {
    if (!boardId) {
      listRef?.current?.scrollTo(0, 0);
    }
  }, [boardId]);

  return (
    <div className='defense-list' ref={listRef}>
      {!isNotNullList && <p style={{ height: '100%' }}>No Result</p>}
      {isNotNullList && (
        <ul className='defense-list-card'>
          {boardList?.map(({ id, keyword, content, user, created_at }) => (
            <li
              className={classNames('defense-list-card__list', {
                current: boardId !== undefined && id === +boardId,
                dimm: boardId !== undefined && id !== +boardId,
              })}
              onClick={() => handleNavigate(id)}
              key={created_at}
            >
              <div className='defense-images'>
                {content?.defense?.map((monster) => (
                  <MonsterImage
                    key={monster.com2us_id}
                    monsterName={monster.name}
                    imageName={monster.image_filename}
                    alt={`${monster.name} Thumbnail`}
                  />
                ))}
              </div>
              <div className='defense-detail'>
                <span className='date'>{handleTimeForToday(created_at)}</span>
                <b className='user'>{user.username}</b>
              </div>
              <div className='dimm-layer'></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DefenseList;
