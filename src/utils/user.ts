export const handleCheckUserRole = (roleType: string) => {
  switch (true) {
    case roleType === 'Admin':
      return '관리자';
    case roleType === 'User':
      return '사용자';
    case roleType === 'Pending':
    default:
      return '대기중';
  }
};
