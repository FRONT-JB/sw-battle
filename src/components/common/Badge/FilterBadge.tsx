interface Props {
  title: string;
}

const FilterBadge = ({ title }: Props) => {
  return <span className='filter-badge'>{title}</span>;
};

export default FilterBadge;
