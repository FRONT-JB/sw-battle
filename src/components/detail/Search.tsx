import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_IMAGE_URL } from '~/constants/monster';
import {
  clearSelectMonster,
  detailInfoSelector,
  selectedInfoSelector,
  setSelectMonster,
} from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { SearchBox } from '../search';
import cn from 'classnames';
import { useCreateCommentMutation } from '~/api/comment';

interface Props {
  onRefresh: () => void;
}

const Search = ({ onRefresh }: Props) => {
  const dispatch = useDispatch();
  const selectedMonster = useSelector(selectedInfoSelector);
  const detailData = useSelector(detailInfoSelector);
  const [create] = useCreateCommentMutation();
  const [comment, setComment] = useState(false);
  const disabled = selectedMonster.length < 3;

  const handleActive = () => {
    setComment(!comment);
    dispatch(clearSelectMonster());
  };

  const handleSelect = (monster: Monster) => {
    dispatch(setSelectMonster(monster));
  };

  const handleCreate = async () => {
    const commentParams = {
      boardId: detailData?.id,
      comment: selectedMonster,
    };
    try {
      await create(commentParams).then(() => {
        onRefresh();
        setComment(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='comment-search'>
      {comment && (
        <div className='comment-search__selected-monster'>
          {selectedMonster?.length > 0 && (
            <div className='comment-search__selected-monster__list'>
              {selectedMonster?.map((monster) => (
                <span
                  key={`${monster.name}-${monster.id}`}
                  onClick={() => handleSelect(monster)}
                  className='img-box'
                >
                  <img
                    src={`${BASE_IMAGE_URL}/${monster.image_filename}`}
                    alt={`${monster.name} Thumbnail`}
                  />
                </span>
              ))}
            </div>
          )}
          <SearchBox />
        </div>
      )}

      <div
        className={cn('comment-search__add-toggle', {
          'comment-search__add-toggle--extend': comment,
        })}
      >
        {!comment ? (
          <button type='button' className='btn-create' onClick={handleActive}>
            <i className='icon icon-create'></i>
            <span className='blind'>Add Comment</span>
          </button>
        ) : (
          <>
            <button type='button' className='btn' onClick={handleActive}>
              <i className='icon icon-cancel'></i>
              <span className='blind'>Cancel</span>
            </button>
            <button
              type='button'
              className='btn'
              onClick={handleCreate}
              disabled={disabled}
            >
              <i
                className={cn('icon icon-save', {
                  'icon-save--disabled': disabled,
                })}
              ></i>
              <span className='blind'>Save</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
