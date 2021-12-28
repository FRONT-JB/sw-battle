import { useSelector } from 'react-redux';
import { selectedInfoSelector } from '~/store/slices/common';
import { Monster } from '~/types/monster';
import { handleReplaceURL } from '~/utils/image';

interface Props {
  searchList: Monster[] | undefined;
  onSelect: (monster: Monster) => void;
}

const SearchList = ({ searchList, onSelect }: Props) => {
  return (
    <ul className='search-box__list'>
      {searchList?.map((monster) => (
        <li
          key={monster.id}
          onClick={() => onSelect(monster)}
          className='search-box__list__item'
        >
          <span className='img-box'>
            <img
              src={handleReplaceURL(monster.image_filename)}
              alt={`${monster.name} Thumbnail`}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
