import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetMonsterQuery } from '~/api/monster';
import { setSelectMonster } from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { InputBox, Loading } from '../common';
import SearchList from './SearchList';
import { debounce } from 'lodash';
import { handleMonsterPayload } from '~/utils/monster';

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchMonster, { data, isFetching, error }] = useLazyGetMonsterQuery();

  const debounceSearch = debounce(
    (searchValue) => searchMonster(searchValue),
    800,
  );

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debounceSearch(value);
  };

  const handlePickMonster = (monster: Monster) => {
    const payload = handleMonsterPayload(monster);
    dispatch(setSelectMonster(payload));
  };

  return (
    <div className='search-box'>
      <InputBox
        id='search'
        label='Search Monster'
        onChange={handleSearchValue}
      />
      {isFetching ? (
        <div className='search-box__loading'>
          <Loading />
        </div>
      ) : !error ? (
        <SearchList searchList={data?.results} onSelect={handlePickMonster} />
      ) : null}
    </div>
  );
};

export default SearchBox;
