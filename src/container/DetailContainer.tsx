import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteCommentMutation,
  useGetCommentByBoardIdQuery,
} from '~/api/comment';
import { Badge, Loading } from '~/components/common';
import NavigateBar from '~/components/common/NavigateBar';
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
    isFetching,
  } = useGetCommentByBoardIdQuery(detailData?.id);
  const [deleteComment] = useDeleteCommentMutation();

  const handleCommentRefetch = () => {
    refetch();
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      if (window.confirm('Do you want to delete it?')) {
        await deleteComment(commentId).then(refetch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, []);

  return (
    <div className='container'>
      <NavigateBar />
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
        {isFetching ? (
          <Loading isFullSize={true} />
        ) : (
          <>
            {comments && comments?.length > 0 ? (
              <ul className='comment-list'>
                {comments?.map(({ id, comment }) => (
                  <li key={`comment-${id}`} className='comment-list__item'>
                    {comment.map(({ name, id, image_filename }) => (
                      <span key={`${name}-${id}`} className='img-box'>
                        <img
                          src={handleReplaceURL(image_filename)}
                          alt={`${name} Thumbnail`}
                        />
                      </span>
                    ))}
                    <div className='comment-list__item__hover'>
                      <button
                        type='button'
                        onClick={() => id && handleDeleteComment(id)}
                      >
                        <i className='icon icon-remove'></i>
                        <span className='blind'>Delete</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='comment-no-result'>No Result</div>
            )}
          </>
        )}
        <Search onRefresh={handleCommentRefetch} />
      </div>
    </div>
  );
};

export default DetailContainer;
