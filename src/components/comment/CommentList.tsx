import { memo } from 'react';
import { Monster } from '~/types/monster';

interface Props {
  comments: Monster[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <ul className='comment__list'>
      {comments?.map((comment) => (
        <li>{comment.name}</li>
      ))}
    </ul>
  );
};

export default memo(CommentList);
