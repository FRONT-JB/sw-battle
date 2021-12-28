import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCommentByBoardIdQuery } from '~/api/comment';
import { Badge, Loading } from '~/components/common';
import { Search } from '~/components/detail';
import { ContentHeader } from '~/components/header';
import { clearSearch, detailInfoSelector } from '~/store/slices/common';
import { handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';

const DetailContainer = () => {
  const dispatch = useDispatch();
  const detailData = useSelector(detailInfoSelector);
  const {
    data: comments,
    refetch,
    isLoading,
  } = useGetCommentByBoardIdQuery(detailData?.id);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, []);

  const handleCommentRefetch = () => {
    refetch();
  };

  return (
    <div className='container'>
      <ContentHeader title='Defense Detail' />
      <div className='content'>
        <div className='attack-result__item detail'>
          <div className='defense-info-monster'>
            {detailData?.content.defense.map(({ id, name, image_filename }) => (
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
              {handleTimeForToday(detailData?.creator.date)}
            </span>
            <span className='defense-info-creator__user-id'>
              {detailData?.creator.userName}
            </span>
            <div className='defense-info-creator__elements'>
              {detailData?.content.defense.map(({ id, name, element }) => (
                <Badge key={`${name}-${id}`} element={element} />
              ))}
            </div>
          </div>
        </div>
        {isLoading && <Loading isFullSize={true} />}
        {comments && comments?.length > 0 && !isLoading && (
          <ul className='comment-list'>
            {comments?.map(({ id, boardId, comment }) => (
              <li key={`comment-${id}`} className='comment-list__item'>
                {comment.map(({ name, id, image_filename }) => (
                  <span key={`${name}-${id}`} className='img-box'>
                    <img
                      src={handleReplaceURL(image_filename)}
                      alt={`${name} Thumbnail`}
                    />
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
        <Search onRefresh={handleCommentRefetch} />
      </div>
    </div>
  );
};

export default DetailContainer;
