import classNames from 'classnames';
import { useChangeRoleMutation, useGetUsersQuery } from '~/api/auth';
import { UserInfo } from '~/types/user';

const User = () => {
  const { data: userList } = useGetUsersQuery();
  const [changeRole] = useChangeRoleMutation();
  const isNotNullCurrently = !!userList?.length;

  const handleChangeRole = async ({ id, username, role }: UserInfo) => {
    const changeRoleType = role === 'admin' ? 'user' : 'admin';
    const changeUserParams = {
      id,
      role: changeRoleType,
    };

    if (
      window.confirm(`${username}\nCurrent: ${role}\nChange: ${changeRoleType}`)
    ) {
      await changeRole(changeUserParams);
    }
  };

  return (
    <div className='users'>
      <div className='users__currently'>
        <b className='title'>사용자 {`(${userList?.length})`}</b>
        {!isNotNullCurrently && <div className='not-found'>No Result</div>}
        {isNotNullCurrently && (
          <ul className='list'>
            <>
              {userList?.map((user) => (
                <li
                  key={user.id}
                  className='list__item'
                  onClick={() => handleChangeRole(user)}
                >
                  <b className='user-name'>{user.username}</b>
                  <span
                    className={classNames('user-role', {
                      admin: user.role === 'admin',
                    })}
                  >
                    {user.role === 'admin' ? '관리자' : '사용자'}
                  </span>
                </li>
              ))}
            </>
          </ul>
        )}
      </div>
      <div className='users__approve'>
        <b className='title'>승인 대기중</b>
        <div className='not-found'>No Result</div>
      </div>
    </div>
  );
};

export default User;
