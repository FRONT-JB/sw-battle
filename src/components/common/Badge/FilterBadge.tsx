import classNames from 'classnames';
import { memo } from 'react';

interface Props {
  title: string;
  onSelect: (filterLabel: string) => void;
  isActive?: boolean;
}

const FilterBadge = ({ title, isActive, onSelect }: Props) => {
  return (
    <span
      className={classNames('filter-badge', {
        'filter-badge--selected': isActive,
      })}
      onClick={() => onSelect(title)}
    >
      {title}
    </span>
  );
};

export default memo(FilterBadge);
