import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetBoardByIdQuery } from '~/api/board';
import {
  useDeleteCommentMutation,
  useGetCommentByBoardIdQuery,
} from '~/api/comment';
import { Badge, Loading, NotFound } from '~/components/common';
import NavigateBar from '~/components/common/NavigateBar';
import { Search } from '~/components/detail';
import { ContentHeader } from '~/components/header';
import { ROUTE_PATH } from '~/routes/path';
import { clearSearch } from '~/store/slices/common';
import { handleIcon, handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';

const DetailContainer = () => {
  const { id: boardId } = useParams<string>();
  const dispatch = useDispatch();
  const { data: detailData, isError } = useGetBoardByIdQuery(
    parseInt(boardId || ''),
  );
  const {
    data: comments,
    refetch,
    isFetching,
  } = useGetCommentByBoardIdQuery(boardId || '');
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
      {isError && (
        <NotFound
          icon={handleIcon('home')}
          pathName={ROUTE_PATH.ROOT}
          label='Not Found'
        />
      )}
      {!isError && (
        <>
          <NavigateBar />
          <ContentHeader title='Defense Detail' />
          <div className='content'>
            <div className='attack-result__item detail'>
              <div className='defense-info-monster'>
                {detailData?.content.defense.map(
                  ({ id, name, image_filename }) => (
                    <span className='img-box' key={`${name}-${id}`}>
                      <img
                        src={handleReplaceURL(image_filename)}
                        alt={`${name} Thumbnail`}
                        title={name}
                      />
                    </span>
                  ),
                )}
              </div>
              <div className='defense-info-creator'>
                <span className='defense-info-creator__date'>
                  {handleTimeForToday(detailData?.created_at || '')}
                </span>
                <span className='defense-info-creator__user-id'>
                  {detailData?.user?.username}
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
            <Search boardId={boardId!} onRefresh={handleCommentRefetch} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailContainer;
