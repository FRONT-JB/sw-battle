import { memo } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router';
import { useGetBoardByIdQuery } from '~/api/board';
import { useGetCommentByBoardIdQuery } from '~/api/comment';
import { ROUTE_PATH } from '~/routes/path';
import { handleIcon } from '~/utils/image';
import { Loading, NotFound } from '../common';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

const Comment = () => {
  const { pathname } = useLocation();
  const { id: boardId } = useParams();
  const isRootPath = pathname === ROUTE_PATH.ROOT;
  const skipQuery = { skip: isRootPath || !boardId };
  const { data: boardList, isFetching: boardFetching } = useGetBoardByIdQuery(
    boardId,
    skipQuery,
  );
  const { data: commentList, isFetching: commentFetching } =
    useGetCommentByBoardIdQuery(boardId, skipQuery);

  const isFetching = boardFetching && commentFetching;
  const isNotNullComment =
    !!commentList?.length && !!boardList?.content?.defense.length;

  return (
    <div className='comment'>
      {isRootPath && (
        <NotFound
          icon={handleIcon('create')}
          pathName={ROUTE_PATH.CREATE}
          label='Choose or Create'
        />
      )}
      {isFetching && <Loading isFullSize={true} />}
      {!isRootPath && !isFetching && !isNotNullComment && (
        <NotFound
          icon={handleIcon('create')}
          pathName={`/${ROUTE_PATH.CREATE}`}
          label='No Result'
        />
      )}

      {!isFetching && isNotNullComment && (
        <>
          <CommentHeader boardThumbnail={boardList?.content?.defense} />
          <ul className='comment__list'>
            {commentList.map(({ id, boardId, comment }) => (
              <CommentList key={id} comments={comment} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default memo(Comment);
