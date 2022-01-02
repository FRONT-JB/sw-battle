export const handleTimeForToday = (date: string) => {
  if (!date) return;
  const today = new Date();
  const postDate = new Date(date);
  const betweenDate = Math.floor(
    (today.getTime() - postDate.getTime()) / 1000 / 60,
  );
  const betweenTimeHour = Math.floor(betweenDate / 60);
  const betweenTimeDay = Math.floor(betweenDate / 60 / 24);
  const betweenTimeYear = Math.floor(betweenTimeDay / 365);

  switch (true) {
    case betweenDate < 1:
      return '방금 전';
    case betweenDate < 60: {
      return `${betweenDate}분 전`;
    }
    case betweenTimeHour < 24: {
      return `${betweenTimeHour}시간 전`;
    }
    case betweenTimeDay < 365: {
      return `${betweenTimeDay}일 전`;
    }
    default:
      return `${betweenTimeYear}년 전`;
  }
};

export const handleCurrentDate = () => {
  return new Date().toLocaleString('ko-KR', {
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
