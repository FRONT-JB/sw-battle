import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDeleteBoardMutation, useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';
import { filterListSelector, setDetailInfo } from '~/store/slices/common';
import { Board } from '~/types/board';
import { handleIcon, handleReplaceURL } from '~/utils/image';
import { handleTimeForToday } from '~/utils/time';
import { Badge, Loading, NotFound } from '../common';

const AttackResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedFilter } = useSelector(filterListSelector);
  const {
    data: boards,
    isLoading,
    refetch,
    isFetching,
  } = useGetBoardListQuery(selectedFilter, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteBoard] = useDeleteBoardMutation();
  const isNotEmptyBoard = !!boards?.length;

  const handleDetail = (detail: Board) => {
    dispatch(setDetailInfo(detail));
    navigate(ROUTE_PATH.DETAIL);
  };

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    boardId: number,
  ) => {
    e.stopPropagation();
    try {
      if (window.confirm('Do you want to delete it?')) {
        await deleteBoard(boardId).then(refetch);
      }
    } catch (error) {}
  };

  if (isLoading || isFetching) return <Loading isFullSize={true} />;
  return (
    <>
      {isNotEmptyBoard && (
        <ul className='attack-result'>
          {boards?.map((board) => (
            <li
              key={board.created_at}
              onClick={() => handleDetail(board)}
              className='attack-result__item'
            >
              <div className='defense-info-monster'>
                {board.content.defense.map(({ id, name, image_filename }) => (
                  <span className='img-box' key={`${name}-${id}`}>
                    <img
                      src={handleReplaceURL(image_filename)}
                      alt={`${name} Thumbnail`}
                      title={name}
                    />
                  </span>
                ))}
              </div>
              <div className='defense-info-creator'>
                <span className='defense-info-creator__date'>
                  {handleTimeForToday(board.created_at)}
                </span>
                <span className='defense-info-creator__user-id'>
                  {board.user.username}
                </span>
                <div className='defense-info-creator__elements'>
                  {board.content.defense.map(({ id, name, element }) => (
                    <Badge key={`${name}-${id}`} element={element} />
                  ))}
                </div>
              </div>
              <button
                type='button'
                className='btn-remove'
                onClick={(e) => handleDelete(e, board.id)}
              >
                <i className='icon icon-remove'></i>
                <span className='blind'>Remove Board</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {!isNotEmptyBoard && (
        <NotFound
          icon={handleIcon('create')}
          pathName={ROUTE_PATH.ADMIN}
          label='No Result'
        />
      )}
    </>
  );
};

export default AttackResult;
