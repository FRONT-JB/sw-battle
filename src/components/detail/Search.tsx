import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_IMAGE_URL } from '~/constants/monster';
import {
  clearSelectMonster,
  selectedInfoSelector,
  setSelectMonster,
} from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { SearchBox } from '../search';
import cn from 'classnames';
import { useCreateCommentMutation } from '~/api/comment';
import useOutside from '~/hooks/useOutside';

interface Props {
  boardId: string;
  onRefresh: () => void;
}

const Search = ({ boardId, onRefresh }: Props) => {
  const dispatch = useDispatch();
  const selectedMonster = useSelector(selectedInfoSelector);
  const [create] = useCreateCommentMutation();
  const [extend, setExtend] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const disabled = selectedMonster.length < 3;

  useOutside(searchRef, () => setExtend(false));

  const handleActive = () => {
    setExtend((prev) => !prev);
    dispatch(clearSelectMonster());
  };

  const handleSelect = (monster: Monster) => {
    dispatch(setSelectMonster(monster));
  };

  const handleCreate = async () => {
    const commentParams = {
      boardId: parseInt(boardId),
      comment: selectedMonster,
    };
    try {
      await create(commentParams).then(() => {
        onRefresh();
        setExtend(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='comment-search' ref={searchRef}>
      {extend && (
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
                    title={monster.name}
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
          'comment-search__add-toggle--extend': extend,
        })}
      >
        {!extend ? (
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
