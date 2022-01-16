import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, selectedInfoSelector } from '~/store/slices/common';
import classNames from 'classnames';
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
      navigate(ROUTE_PATH.ROOT, { replace: true });
    }
  }, [isSuccess, createError]);

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

  const handleClear = () => {
    dispatch(clearSearch());
  };

  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  if (!isNotEmpty) return null;

  return (
    <div className='search-select'>
      <div className='btn-set'>
        <button type='button' className='btn' onClick={handleClear}>
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
