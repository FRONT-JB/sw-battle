import { handleCurrentDate } from '~/utils/time';
interface Props {
  title: string;
}

const ContentHeader = ({ title }: Props) => (
  <div className='content-header'>
    <span className='content-header__date'>{handleCurrentDate()}</span>
    <b className='content-header__title'>{title}</b>
  </div>
);

export default ContentHeader;
