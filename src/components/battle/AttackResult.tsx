import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import { setDetailInfo } from '~/store/slices/common';
import { Board } from '~/types/board';
import { handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';
import { Badge } from '../common';

const AttackResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: boards } = useGetBoardListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const isNotEmptyBoard = !!boards?.length;

  const handleDetail = (detail: Board) => {
    dispatch(setDetailInfo(detail));
    navigate(ROUTE_PATH.DETAIL);
  };

  return (
    <>
      {isNotEmptyBoard && (
        <ul className='attack-result'>
          {boards?.map((monster) => (
            <li
              key={monster.creator.date}
              onClick={() => handleDetail(monster)}
              className='attack-result__item'
            >
              <div className='defense-info-monster'>
                {monster.content.defense.map(({ id, name, image_filename }) => (
                  <span className='img-box' key={`${name}-${id}`}>
                    <img
                      src={handleReplaceURL(image_filename)}
                      alt={`${name} Thumbnail`}
                    />
                  </span>
                ))}
              </div>
              <div className='defense-info-creator'>
                <span className='defense-info-creator__date'>
                  {handleTimeForToday(monster.creator.date)}
                </span>
                <span className='defense-info-creator__user-id'>
                  {monster.creator.userName}
                </span>
                <div className='defense-info-creator__elements'>
                  {monster.content.defense.map(({ id, name, element }) => (
                    <Badge key={`${name}-${id}`} element={element} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isNotEmptyBoard && <div className='content__not-found'>No result</div>}
    </>
  );
};

export default AttackResult;
