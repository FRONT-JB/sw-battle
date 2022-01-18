import { Comment } from '~/types/comment';
import { handleReplaceURL } from '~/utils/image';

interface Props {
  comments: Comment[];
  onDelete: (commentId: number) => void;
}

const CommentList = ({ comments, onDelete }: Props) => {
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
          <div className='dimm-layer'>
            <button type='button' onClick={() => id && onDelete(id)}>
              <i className='icon icon-remove'></i>
              <span className='blind'>Delete Comment</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
