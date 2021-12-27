import { useNavigate } from 'react-router-dom';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import { handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';
import { Badge } from '../common';

const AttackResult = () => {
  const navigate = useNavigate();
  const { data: boards } = useGetBoardListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isNotEmptyBoard = !!boards?.length;

  return (
    <>
      {isNotEmptyBoard && (
        <ul className='attack-result'>
          {boards?.map(({ id, creator, content }) => (
            <li
              key={creator.date}
              onClick={() => navigate(`defense/${id}`)}
              className='attack-result__item'
            >
              <div className='defense-info-monster'>
                {content.defense.map(({ id, name, image_filename }) => (
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
                  {handleTimeForToday(creator.date)}
                </span>
                <span className='defense-info-creator__user-id'>
                  {creator.userName}
                </span>
                <div className='defense-info-creator__elements'>
                  {content.defense.map(({ id, name, element }) => (
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
