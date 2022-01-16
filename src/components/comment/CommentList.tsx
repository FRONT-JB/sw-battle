import { Comment } from '~/types/comment';
import { handleReplaceURL } from '~/utils/image';

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <ul className='comment__list'>
      {comments?.map(({ comment, id }) => (
        <li key={id} className='comment__list__item'>
          <div className='thunmbnail-list'>
            {comment?.map(({ image_filename, name, com2us_id }) => (
              <span key={com2us_id} className='img-box'>
                <img
                  src={handleReplaceURL(image_filename)}
                  alt={`${name} Thumbnail`}
                />
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
