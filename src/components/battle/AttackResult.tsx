import { useGetBoardListQuery } from '~/api/board';
import { handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';
import { Badge } from '../common';

const AttackResult = () => {
  const { data: boards } = useGetBoardListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const isNotEmptyBoard = !!boards?.length;

  return (
    <ul className='attack-result'>
      {isNotEmptyBoard && (
        <>
          {boards?.map(({ creator, content }) => (
            <li key={creator.date} className='attack-result__item'>
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
        </>
      )}
      {!isNotEmptyBoard && <div>No Result</div>}
    </ul>
  );
};

export default AttackResult;
