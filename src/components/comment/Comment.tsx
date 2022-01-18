import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useGetBoardByIdQuery } from '~/api/board';
import {
  useDeleteCommentMutation,
  useGetCommentByBoardIdQuery,
} from '~/api/comment';
import { ROUTE_PATH } from '~/routes/path';
import { handleIcon } from '~/utils/image';
import { Loading, NotFound } from '../common';
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
  const {
    data: commentList,
    isFetching: commentFetching,
    refetch,
  } = useGetCommentByBoardIdQuery(boardId, skipQuery);
  const [deleteComment] = useDeleteCommentMutation();
  const isFetching = boardFetching && commentFetching;
  const isNotNullComment =
    !!commentList?.length && !!boardList?.content?.defense.length;

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId).then(refetch);
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
          state={boardId}
          label='No Result'
        />
      )}

      {!isFetching && isNotNullComment && (
        <>
          <CommentHeader boardThumbnail={boardList?.content?.defense} />
          <CommentList comments={commentList} onDelete={handleDeleteComment} />
          <div className='btn-set'>
            <Link to={`/${ROUTE_PATH.CREATE}`} state={boardId}>
              <i className='icon icon-create'></i>
              <span className='blind'>Create Comment</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
