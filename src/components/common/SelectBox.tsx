import { ChangeEvent, memo } from 'react';

interface Props {
  id: string;
  name: string;
  filterList: string[];
  selectedFilter?: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectBox = ({
  id,
  name,
  filterList,
  selectedFilter,
  onChange,
}: Props) => {
  return (
    <span className='select-box'>
      <input type='text' list={id} name={name} onChange={onChange} />
      <datalist id={id}>
        {filterList?.map((list, index) => {
          const isActive = selectedFilter?.includes(list);
          if (isActive) return;
          return (
            <option key={`${list}-${index}`} value={list}>
              {list}
            </option>
          );
        })}
      </datalist>
    </span>
  );
};

export default SelectBox;
