import { BASE_IMAGE_URL } from '~/constants/monster';
import { Monster } from '~/types/monster';

interface Props {
  searchList: Monster[] | undefined;
  onSelect: (monster: Monster) => void;
}

const SearchList = ({ searchList, onSelect }: Props) => {
  return (
    <div className='search-box__list'>
      {searchList?.map((monster) => (
        <div
          key={monster.id}
          onClick={() => onSelect(monster)}
          className='search-box__list__item'
        >
          <div className='img-box'>
            <img
              src={`${BASE_IMAGE_URL}/${monster.image_filename}`}
              alt={`${monster.name} Thumbnail`}
            />
          </div>
          {monster.name}
        </div>
      ))}
    </div>
  );
};

export default SearchList;
