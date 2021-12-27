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

const AttackSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedMonster = useSelector(selectedInfoSelector);
  const isNotEmpty = !!selectedMonster.length;
  const disabled = selectedMonster.length < 3;
  const [create, { data }] = useCreateBoardMutation();
  const handleCancel = () => {
    navigate(ROUTE_PATH.ROOT);
  };

  const handleSelect = (monster: Monster) => {
    dispatch(setSelectMonster(monster));
  };

  const handleCreate = async () => {
    const createParams = {
      creator: {
        date: new Date().getTime(),
        userName: '쿠와앙',
      },
      content: {
        defense: selectedMonster,
      },
    };

    try {
      await create(createParams).then(() =>
        navigate(ROUTE_PATH.ROOT, { replace: true }),
      );
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
            <div className='img-box'>
              <img src={handleReplaceURL(monster.image_filename)} alt='' />
            </div>
          </div>
        ))}
      </div>
      <div className='btn-set'>
        <button type='button' className='btn' onClick={handleCancel}>
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

export default AttackSelect;
