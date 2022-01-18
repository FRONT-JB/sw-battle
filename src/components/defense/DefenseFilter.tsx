import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { filterListSelector } from '~/store/slices/common';
import FilterBadge from '../common/Badge/FilterBadge';
import classNames from 'classnames';
import useOutside from '~/hooks/useOutside';

const DefenseFilter = () => {
  const { filterList } = useSelector(filterListSelector);
  const [extend, setExtend] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useOutside(filterRef, () => setExtend(false));

  const handleExtends = () => {
    setExtend((prev) => !prev);
  };

  return (
    <div className='defense-filter'>
      <b className='defense-filter__title'>Filters</b>
      {extend && (
        <button
          type='button'
          onClick={handleExtends}
          className='btn btn-filter'
        >
          CLOSE FILTERS
        </button>
      )}
      {!extend && (
        <button
          type='button'
          onClick={handleExtends}
          className='btn btn-filter'
        >
          MORE FILTERS
        </button>
      )}
      <div
        ref={filterRef}
        className={classNames('defense-filter__list', { extends: extend })}
      >
        {filterList?.map((filter, index) => (
          <FilterBadge key={index} title={filter} />
        ))}
      </div>
    </div>
  );
};

export default DefenseFilter;
