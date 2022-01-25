import { memo } from 'react';
import { UserRoleTooltip } from '~/types/user';

interface Props {
  tooltips: UserRoleTooltip[];
  type: string;
  userId: number;
  onClick: (id: number, value: string) => void;
}

const Tooltip = ({ tooltips, type, userId, onClick }: Props) => {
  return (
    <div className={`tooltip-box ${type}`}>
      {tooltips?.map(({ id, tooltip }) => (
        <button
          key={id}
          type='button'
          className='tooltip-box__button'
          onClick={() => onClick(userId, tooltip)}
        >
          {tooltip}
        </button>
      ))}
    </div>
  );
};

export default memo(Tooltip);
