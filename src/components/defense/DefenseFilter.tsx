import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  filterListSelector,
  setResetFilter,
  setSelectFilter,
} from '~/store/slices/common';
import FilterBadge from '../common/Badge/FilterBadge';
import useOutside from '~/hooks/useOutside';
import { InputBox } from '../common';
import { useGetBoardListQuery } from '~/api/board';
import { ROUTE_PATH } from '~/routes/path';

const DefenseFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterList, selectedFilter } = useSelector(filterListSelector);
  const { refetch } = useGetBoardListQuery([], {
    skip: selectedFilter?.length === 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [extend, setExtend] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const isActiveFilter = !!selectedFilter.length;
  const isSelected = !!selected.length;

  const filterSearchList = useMemo(() => {
    if (!searchValue) {
      return filterList;
    }
    return filterList?.filter((filter) =>
      filter.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, filterList, selected]);

  const handleExtends = () => {
    setExtend((prev) => !prev);
  };

  const handleSearchFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchValue(value);
    },
    [searchValue],
  );

  const handleSelectFilter = useCallback((filterLabel: string) => {
    setSelected((prev) => {
      const isConflict = prev.includes(filterLabel);
      const isOverSelect = prev.length === 3;
      if (isConflict) {
        return prev.filter((filter) => filter !== filterLabel);
      } else if (isOverSelect) {
        return prev;
      }
      return [...prev, filterLabel];
    });
  }, []);

  const handleSearch = () => {
    dispatch(setSelectFilter(selected));
    setExtend(false);
    navigate(ROUTE_PATH.ROOT);
  };

  const handleResetFilter = () => {
    setSelected([]);
    dispatch(setResetFilter());
    refetch();
    navigate(ROUTE_PATH.ROOT);
  };

  useEffect(() => {
    if (!extend) {
      setSearchValue('');
    }
  }, [extend]);

  useOutside(filterRef, () => setExtend(false));

  return (
    <div className='defense-filter' ref={filterRef}>
      <b className='defense-filter__title'>Filters</b>
      <div className='utils'>
        <button
          type='button'
          onClick={handleExtends}
          className='btn btn-filter'
        >
          {extend ? 'CLOSE FILTERS' : 'MORE FILTER'}
        </button>
        {!extend && isActiveFilter && (
          <button
            type='button'
            className='btn btn-reset'
            onClick={handleResetFilter}
          >
            <i className='icon icon-reset'></i>
            <span className='blind'>Reset</span>
          </button>
        )}
      </div>
      <div className={classNames('defense-filter__list', { extends: extend })}>
        {isSelected && (
          <div className='defense-filter__list__selected'>
            {selected.map((filter) => (
              <FilterBadge
                key={filter}
                title={filter}
                isActive={selected?.includes(filter)}
                onSelect={handleSelectFilter}
              />
            ))}
            <div className='utils'>
              <button
                type='button'
                className='btn btn-reset'
                onClick={handleResetFilter}
              >
                <i className='icon icon-reset'></i>
                <span className='blind'>Reset</span>
              </button>
              <button
                type='button'
                className='btn btn-search'
                onClick={handleSearch}
              >
                <i className='icon icon-search'></i>
                <span className='blind'>Search</span>
              </button>
            </div>
          </div>
        )}
        <InputBox
          id='search'
          onChange={(e) => handleSearchFilter(e)}
          placeHolder='Filter Search'
          value={searchValue}
        />
        <div className='defense-filter__list__badge'>
          {!!filterSearchList.length &&
            filterSearchList?.map((filter) => (
              <FilterBadge
                key={filter}
                title={filter}
                isActive={selected?.includes(filter)}
                onSelect={handleSelectFilter}
              />
            ))}
          {!!filterSearchList.length === false && (
            <span className='not-found'>Not Found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefenseFilter;
