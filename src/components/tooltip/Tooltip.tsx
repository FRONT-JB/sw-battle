import { memo } from 'react';
import { UserInfo, UserRoleTooltip } from '~/types/user';

interface Props {
  tooltips: UserRoleTooltip[];
  type: string;
  userId: number;
  onClick: (id: number, value: UserInfo['role']) => void;
}

const Tooltip = ({ tooltips, type, userId, onClick }: Props) => {
  return (
    <div className={`tooltip-box ${type}`}>
      {tooltips?.map(({ id, role }) => (
        <button
          key={id}
          type='button'
          className='tooltip-box__button'
          onClick={() => onClick(userId, role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default memo(Tooltip);
