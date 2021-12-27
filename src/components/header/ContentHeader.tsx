import { handleCurrentDate } from '~/utils/time';

interface Props {
  title: string;
}

const ContentHeader = ({ title }: Props) => {
  return (
    <div className='content-header'>
      <b className='content-header__title'>{title}</b>
      <span className='content-header__date'>{handleCurrentDate()}</span>
    </div>
  );
};

export default ContentHeader;
