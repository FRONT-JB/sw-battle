import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterListSelector,
  setResetFilter,
  setSelectFilter,
} from '~/store/slices/common';
import { SelectBox } from '../common';
import { debounce } from 'lodash';

const selectList = ['selectOne', 'selectTwo', 'selectThree'];

const AttackFilter = () => {
  const dispatch = useDispatch();
  const { filterList, selectedFilter } = useSelector(filterListSelector);

  const debounceFilter = debounce(
    (filterName, filterValue) =>
      dispatch(setSelectFilter({ filterName, filterValue })),
    800,
  );

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debounceFilter(name, value);
  };

  const handleReset = () => {
    dispatch(setResetFilter());
  };

  const handleSearch = () => {
    console.log('search filter');
  };

  return (
    <div className='attack-filter'>
      <div className='attack-filter__select'>
        {selectList.map((selectName) => (
          <SelectBox
            key={selectName}
            id={selectName}
            name={selectName}
            filterList={filterList}
            selectedFilter={Object.values(selectedFilter)}
            onChange={handleFilter}
          />
        ))}
      </div>

      <div className='attack-filter__btn-set'>
        <button type='button' className='btn btn-search' onClick={handleSearch}>
          <i className='icon icon-search'></i>
          <span className='blind'>Search</span>
        </button>
        <button type='button' className='btn btn-reset' onClick={handleReset}>
          <i className='icon icon-reset'></i>
          <span className='blind'>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default AttackFilter;
