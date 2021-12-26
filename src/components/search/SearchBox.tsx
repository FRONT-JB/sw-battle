import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMonsterQuery } from '~/api/monster';
import { searchValueSelector, setSearchValue } from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { InputBox, Loading, NotFound } from '../common';
import SearchList from './SearchList';
import { debounce } from 'lodash';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(searchValueSelector);
  const { data, isFetching, error } = useGetMonsterQuery(searchValue, {
    skip: searchValue.trim() === '',
  });

  const debounceSearch = debounce(
    (searchValue) => dispatch(setSearchValue(searchValue)),
    500,
  );

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debounceSearch(value);
  };

  const handlePickMonster = (monster: Monster) => {
    console.log(monster);
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchValue(''));
    };
  }, []);

  return (
    <div className='search-box'>
      <InputBox
        id='search'
        onChange={handleSearchValue}
        placeHolder='몬스터 이름'
      />
      {isFetching ? (
        <div className='search-box__loading'>
          <Loading />
        </div>
      ) : (
        <SearchList searchList={data?.results} onSelect={handlePickMonster} />
      )}
    </div>
  );
};

export default SearchBox;
