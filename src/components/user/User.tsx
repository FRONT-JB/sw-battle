import { useCallback } from 'react';
import {
  useChangeRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from '~/api/auth';
import UserList from './UserList';

const User = () => {
  const { data: userList } = useGetUsersQuery();
  const [changeRole] = useChangeRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const isNotNullCurrently = !!userList?.current?.length;
  const isNotNullPending = !!userList?.pending?.length;

  const handleChangeRole = useCallback(async (id: number, role: string) => {
    if (role === 'Delete' && window.confirm('Delete User?')) {
      await deleteUser(id);
      return;
    }
    if (window.confirm(`Change role is ${role}?`)) {
      await changeRole({ id, role });
    }
  }, []);

  return (
    <div className='users'>
      <div className='users__currently'>
        <b className='title'>사용자 {`(${userList?.current.length})`}</b>
        {!isNotNullCurrently && <div className='not-found'>No Result</div>}
        {isNotNullCurrently && (
          <ul className='list'>
            {userList?.current?.map((user) => (
              <UserList key={user.id} user={user} onClick={handleChangeRole} />
            ))}
          </ul>
        )}
      </div>
      <div className='users__approve'>
        <b className='title'>승인 대기중 {`(${userList?.pending?.length})`}</b>
        {!isNotNullPending && <div className='not-found'>No Result</div>}
        {isNotNullPending && (
          <ul className='list'>
            {userList?.pending?.map((user) => (
              <UserList key={user.id} user={user} onClick={handleChangeRole} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default User;
