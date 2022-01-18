import { handleReplaceURL } from '~/utils/image';

interface Props {
  monsterName: string;
  imageName: string;
  alt: string;
}

const MonsterImage = ({ monsterName, imageName, alt }: Props) => {
  return (
    <span className='img-box'>
      <img src={handleReplaceURL(imageName)} alt={alt} title={monsterName} />
    </span>
  );
};

export default MonsterImage;
