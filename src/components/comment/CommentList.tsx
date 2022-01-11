import { Monster } from '~/types/monster';
import { handleReplaceURL } from '~/utils/image';

interface Props {
  comments: Monster[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <li className='comment__list__item'>
      <div className='thunmbnail-list'>
        {comments?.map(({ image_filename, name, com2us_id }) => (
          <span key={com2us_id} className='img-box'>
            <img
              src={handleReplaceURL(image_filename)}
              alt={`${name} Thumbnail`}
            />
          </span>
        ))}
      </div>
    </li>
  );
};

export default CommentList;
