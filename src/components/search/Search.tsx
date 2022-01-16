import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetMonsterQuery } from '~/api/monster';
import { setSelectMonster } from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { InputBox, Loading } from '../common';
import { debounce } from 'lodash';
import { handleMonsterPayload } from '~/utils/monster';
import SearchSelect from './SearchSelect';
import MonsterImage from '../common/MonsterImage';

const Search = () => {
  const dispatch = useDispatch();
  const [searchMonster, { data: searchData, isFetching }] =
    useLazyGetMonsterQuery();

  const debounceSearch = debounce(
    (searchValue) => searchMonster(searchValue),
    800,
  );

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isNullValue = value.trim().length > 0;
    isNullValue && debounceSearch(value);
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
      {isFetching && (
        <div className='search-box__loading'>
          <Loading />
        </div>
      )}
      {searchData && (
        <ul className='search-box__data'>
          {searchData?.results?.map((monster) => (
            <li
              key={monster.com2us_id}
              className='search-box__data__list'
              onClick={() => handlePickMonster(monster)}
            >
              <MonsterImage
                monsterName={monster.name}
                imageName={monster.image_filename}
                alt={`${monster.name} Thumbnail`}
              />
            </li>
          ))}
        </ul>
      )}
      <SearchSelect />
    </div>
  );
};

export default Search;
