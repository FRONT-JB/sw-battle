import { memo, MouseEvent, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { throttle } from 'lodash';
import { useDeleteBoardMutation, useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import MonsterImage from '../common/MonsterImage';
import { handleTimeForToday } from '~/utils/time';
import { selectedInfoSelector } from '~/store/slices/common';

const DefenseList = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { data: boardList } = useGetBoardListQuery({});
  const [deletePost] = useDeleteBoardMutation();
  const selectedMonster = useSelector(selectedInfoSelector);
  const listRef = useRef<HTMLDivElement>(null);
  const isNotNullList = !!boardList?.length;

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

  const handleDeletePost = async (
    e: MouseEvent<HTMLButtonElement>,
    boardId: number,
  ) => {
    e.stopPropagation();
    await deletePost(JSON.stringify(boardId)).then(() =>
      navigate(`${ROUTE_PATH.ROOT}`),
    );
  };

  const handleNavigate = (id: number) => {
    navigate(`${ROUTE_PATH.DETAIL}/${id}`);
  };

  return (
    <div className='defense-list' ref={listRef}>
      {!isNotNullList && <p style={{ height: '100%' }}>No Result</p>}
      {isNotNullList && (
        <ul className={classNames('defense-list-card')}>
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
                <div className='keyword'>
                  {keyword?.map((keyword) => (
                    <span className='keyword__item'>{keyword}</span>
                  ))}
                </div>
              </div>
              <div className='hover-layer'>
                <button type='button' onClick={(e) => handleDeletePost(e, id)}>
                  <i className='icon icon-remove'></i>
                  <span className='blind'>Delete Board</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(DefenseList);
