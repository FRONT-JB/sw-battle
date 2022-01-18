import { Monster } from '~/types/monster';
import { handleReplaceURL } from '~/utils/image';

interface Props {
  boardThumbnail: Monster[] | undefined;
}

const CommentHeader = ({ boardThumbnail }: Props) => {
  return (
    <div className='comment__header'>
      {boardThumbnail?.map(({ image_filename, name, com2us_id }) => (
        <span key={com2us_id} className='img-box'>
          <img
            src={handleReplaceURL(image_filename)}
            alt={`${name} Thumbnail`}
          />
        </span>
      ))}
    </div>
  );
};
export default CommentHeader;
