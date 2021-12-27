import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMonsterQuery } from '~/api/monster';
import {
  searchValueSelector,
  selectedInfoSelector,
  setSearchValue,
  setSelectMonster,
} from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { Badge, InputBox, Loading, NotFound } from '../common';
import SearchList from './SearchList';
import { debounce } from 'lodash';
import { BASE_IMAGE_URL } from '~/constants/monster';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(searchValueSelector);
  const selectedValue = useSelector(selectedInfoSelector);
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
    dispatch(setSelectMonster(monster));
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
      {selectedValue?.map((monster) => (
        <p>
          <img src={`${BASE_IMAGE_URL}/${monster.image_filename}`} alt='' />
          <Badge element={monster.element} />
          {monster.name}
        </p>
      ))}
    </div>
  );
};

export default SearchBox;
