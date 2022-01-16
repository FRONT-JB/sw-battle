import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useDeleteBoardMutation, useGetBoardByIdQuery } from '~/api/board';
import {
  useCreateCommentMutation,
  useGetCommentByBoardIdQuery,
} from '~/api/comment';
import { ROUTE_PATH } from '~/routes/path';
import { handleIcon } from '~/utils/image';
import { Loading, NotFound } from '../common';
import CommentCreate from './CommentCreate';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

const Comment = () => {
  const { pathname } = useLocation();
  const { id: boardId } = useParams();
  const navigate = useNavigate();
  const isRootPath = pathname === ROUTE_PATH.ROOT;
  const skipQuery = { skip: isRootPath || !boardId };
  const { data: boardList, isFetching: boardFetching } = useGetBoardByIdQuery(
    boardId,
    skipQuery,
  );
  const { data: commentList, isFetching: commentFetching } =
    useGetCommentByBoardIdQuery(boardId, skipQuery);
  const [createComment] = useCreateCommentMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const isFetching = boardFetching && commentFetching;
  const isNotNullComment =
    !!commentList?.length && !!boardList?.content?.defense.length;

  const handleDeleteBoard = () => {
    if (!boardId) return;
    deleteBoard(boardId).then(() => navigate(ROUTE_PATH.ROOT));
  };

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
          <CommentList comments={commentList} />
          <CommentCreate />
        </>
      )}
    </div>
  );
};

export default memo(Comment);
