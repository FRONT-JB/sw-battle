import classNames from 'classnames';
import { memo, useRef, useState } from 'react';
import { RoleTooltip } from '~/constants/tooltip';
import useOutside from '~/hooks/useOutside';
import { UserInfo } from '~/types/user';
import { handleCheckUserRole } from '~/utils/user';
import { Tooltip } from '../tooltip';

interface Props {
  user: UserInfo;
  onClick: (id: number, role: string) => void;
}

const UserList = ({ user, onClick }: Props) => {
  const [tooltipOepn, setTooltipOpen] = useState(false);
  const userRef = useRef<HTMLLIElement>(null);
  const RoleTooltips = RoleTooltip.filter(
    (value) => value.tooltip !== user.role,
  );

  useOutside(userRef, () => setTooltipOpen(false));

  return (
    <li
      className='list__item'
      ref={userRef}
      onClick={() => setTooltipOpen((prev) => !prev)}
    >
      <b className='user-name'>{user.username}</b>
      <span
        className={classNames('user-role', {
          admin: user.role === 'Admin',
        })}
      >
        {handleCheckUserRole(user.role)}
      </span>
      {tooltipOepn && (
        <Tooltip
          tooltips={RoleTooltips}
          type='role'
          userId={user.id}
          onClick={onClick}
        />
      )}
    </li>
  );
};

export default memo(UserList);
