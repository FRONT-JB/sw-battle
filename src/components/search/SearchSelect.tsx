import { useDispatch, useSelector } from 'react-redux';
import {
  clearSearch,
  selectedInfoSelector,
  setSelectMonster,
} from '~/store/slices/common';
import { handleReplaceURL } from '~/utils/image';
import cn from 'classnames';
import { Monster } from '~/types/monster';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '~/routes/path';
import { useEffect } from 'react';
import { useCreateBoardMutation } from '~/api/board';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const SearchSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedMonster = useSelector(selectedInfoSelector);
  const isNotEmpty = !!selectedMonster.length;
  const disabled = selectedMonster.length < 3;
  const [create, { isSuccess, error: createError }] = useCreateBoardMutation();

  useEffect(() => {
    const error = createError as FetchBaseQueryError;
    if (error && error.status === 409) {
      window.alert('These are duplicated Attack posts.');
    }
    if (isSuccess) {
      handleNavigateHome();
    }
  }, [isSuccess, createError]);

  const handleNavigateHome = () => {
    navigate(ROUTE_PATH.ROOT);
  };

  const handleSelect = (monster: Monster) => {
    dispatch(setSelectMonster(monster));
  };

  const handleCreate = async () => {
    const createParams = {
      content: {
        defense: selectedMonster,
      },
    };
    try {
      await create(createParams);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, []);

  if (!isNotEmpty) return null;

  return (
    <div className='attack-select'>
      <div className='attack-select__list'>
        {selectedMonster?.map((monster) => (
          <div
            key={monster.id}
            onClick={() => handleSelect(monster)}
            className='attack-select__list'
          >
            <span className='img-box'>
              <img
                src={handleReplaceURL(monster.image_filename)}
                alt={`${monster.name} Thumbnail`}
                title={monster.name}
              />
            </span>
          </div>
        ))}
      </div>
      <div className='btn-set'>
        <button type='button' className='btn' onClick={handleNavigateHome}>
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
      </div>
    </div>
  );
};

export default SearchSelect;
