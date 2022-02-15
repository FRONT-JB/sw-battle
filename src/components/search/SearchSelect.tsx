import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { clearSearch, selectedInfoSelector } from '~/store/slices/common';
import { ROUTE_PATH } from '~/routes/path';
import { useCreateBoardMutation } from '~/api/board';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useCreateCommentMutation } from '~/api/comment';
import MonsterImage from '../common/MonsterImage';
import { Monster } from '~/types/monster';
import useToastify from '~/hooks/useToastify';
import { TOASTIFY_ALERT } from '~/constants/toastify';

interface Props {
  onSelect: (monster: Monster) => void;
}

const SearchSelect = ({ onSelect }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: boardId } = useLocation();
  const selectedMonster = useSelector(selectedInfoSelector);
  const { setToast } = useToastify();
  const isSelected = !!selectedMonster.length;
  const disabled = selectedMonster.length < 3;

  const [createBoard, { isSuccess: boardSuccess, error: boardError }] =
    useCreateBoardMutation();

  const [createComment, { isSuccess: commentSuccess, error: commentError }] =
    useCreateCommentMutation();

  useEffect(() => {
    const errorByBoard = boardError as FetchBaseQueryError;
    const errorByComment = commentError as FetchBaseQueryError;

    if (errorByBoard && errorByBoard.status === 409) {
      setToast(TOASTIFY_ALERT.CONFLICT('Attack Post'));
    }
    if (errorByComment && errorByComment.status === 404) {
      setToast(TOASTIFY_ALERT.FAILED('Create'));
    }
    if (boardSuccess) {
      navigate(ROUTE_PATH.ROOT, { replace: true });
      setToast(TOASTIFY_ALERT.SUCCESS('Create'));
    }
    if (commentSuccess) {
      navigate(`/${ROUTE_PATH.DETAIL}/${boardId}`);
      setToast(TOASTIFY_ALERT.SUCCESS('Create'));
    }
  }, [boardSuccess, commentSuccess, boardError, commentError]);

  const handleCreateParams = {
    board: async () => {
      const createParams = {
        content: {
          defense: selectedMonster,
        },
      };
      await createBoard(createParams);
    },
    comment: async () => {
      const selectedBoardId = typeof boardId === 'string' ? +boardId : 0;
      const createParams = {
        boardId: selectedBoardId,
        comment: selectedMonster,
      };
      await createComment(createParams);
    },
  };

  const handleSubmit = () => {
    const isCommentSubmit = boardId !== null;
    isCommentSubmit
      ? handleCreateParams['comment']()
      : handleCreateParams['board']();
  };

  const handleClear = () => {
    dispatch(clearSearch());
  };

  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  if (!isSelected) return null;

  return (
    <div className='search-select'>
      {isSelected && (
        <div className='search-select__preview'>
          {selectedMonster?.map((monster) => (
            <div
              className='search-select__preview__item'
              onClick={() => onSelect(monster)}
              key={monster.com2us_id}
            >
              <MonsterImage
                monsterName={monster.name}
                imageName={monster.image_filename}
                alt={`${monster.name} Thumbnail`}
              />
            </div>
          ))}
        </div>
      )}
      <div className='btn-set'>
        <button type='button' className='btn' onClick={handleClear}>
          <i className='icon icon-cancel'></i>
          <span className='blind'>Cancel</span>
        </button>
        <button
          type='button'
          className='btn'
          onClick={handleSubmit}
          disabled={disabled}
        >
          <i
            className={classNames('icon icon-save', {
              'icon-save--disabled': disabled,
            })}
          ></i>
          <span className='blind'>Save</span>
        </button>
      </div>
    </div>
  );
};

export default SearchSelect;
