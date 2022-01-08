import { memo } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router';
import { useGetCommentByBoardIdQuery } from '~/api/comment';
import { ROUTE_PATH } from '~/routes/path';
import { handleIcon } from '~/utils/image';
import { Loading, NotFound } from '../common';
import CommentList from './CommentList';

const Comment = () => {
  const { pathname } = useLocation();
  const { id: boardId } = useParams();
  const isRootPath = pathname === ROUTE_PATH.ROOT;
  const { data: commentList, isFetching } = useGetCommentByBoardIdQuery(
    boardId || '',
    {
      skip: isRootPath,
    },
  );
  const isNotNullComment = !!commentList?.length;
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
          icon={handleIcon('home')}
          pathName={ROUTE_PATH.ROOT}
          label='No Result'
        />
      )}
      {!isFetching &&
        isNotNullComment &&
        commentList.map(({ id, boardId, comment }) => (
          <CommentList key={id} comments={comment} />
        ))}
    </div>
  );
};

export default memo(Comment);
