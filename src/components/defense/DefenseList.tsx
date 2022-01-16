import { memo, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import { handleTimeForToday } from '~/utils/time';
import MonsterImage from '../common/MonsterImage';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';
import { selectedInfoSelector } from '~/store/slices/common';
import { userSelector } from '~/store/slices/auth';

const DefenseList = () => {
  const { data: boardList } = useGetBoardListQuery({});
  const { id: boardId } = useParams();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const isNotNullList = !!boardList?.length;
  const selectedMonster = useSelector(selectedInfoSelector);
  const currentUser = useSelector(userSelector);

  const handleNavigate = (id: number) => {
    navigate(`${ROUTE_PATH.DETAIL}/${id}`);
  };

  useEffect(() => {
    if (!boardId) {
      listRef?.current?.scrollTo(0, 0);
    }
    listRef.current?.addEventListener(
      'scroll',
      throttle(handleScrollActive, 1000),
    );
    return () => {
      listRef.current?.removeEventListener(
        'scroll',
        throttle(handleScrollActive, 1000),
      );
    };
  }, [boardId]);

  const handleScrollActive = () => {
    if (!listRef || !listRef.current) return;
    const isScroll = listRef.current.scrollTop > 0;
    if (isScroll) {
      listRef.current.classList.add('isScroll');
    } else {
      listRef.current.classList.remove('isScroll');
    }
  };


  return (
    <div className='defense-list' ref={listRef}>
      {!isNotNullList && <p style={{ height: '100%' }}>No Result</p>}
      {isNotNullList && (
        <ul className={classNames('defense-list-card')}>
          {!!selectedMonster?.length && (
            <li className='defense-list-card__list'>
              <div className='defense-images'>
                {selectedMonster?.map((monster) => (
                  <MonsterImage
                    key={monster.com2us_id}
                    monsterName={monster.name}
                    imageName={monster.image_filename}
                    alt={`${monster.name} Thumbnail`}
                  />
                ))}
              </div>
              <div className='defense-detail'>
                <b className='user'>{currentUser?.username}</b>
              </div>
            </li>
          )}
          {boardList?.map(({ id, keyword, content, user, created_at }) => (
            <li
              className={classNames('defense-list-card__list', {
                current: boardId !== undefined && id === +boardId,
                dimm:
                  (boardId !== undefined && id !== +boardId) ||
                  !!selectedMonster.length,
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

export default memo(DefenseList);
