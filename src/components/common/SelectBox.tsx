import { ChangeEvent, memo, useEffect, useRef } from 'react';

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
  const isNullFilter = !!selectedFilter?.length;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    if (!isNullFilter) {
      inputRef.current.value = '';
    }
    inputRef.current.blur();
  }, [inputRef.current, isNullFilter]);

  return (
    <span className='select-box'>
      <input
        ref={inputRef}
        type='text'
        list={id}
        name={name}
        autoComplete='off'
        onChange={onChange}
      />
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
