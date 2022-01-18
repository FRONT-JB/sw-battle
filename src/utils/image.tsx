import { BASE_IMAGE_URL } from '~/constants/monster';
import classNames from 'classnames';

export const handleReplaceURL = (imgName: string) => {
  return `${BASE_IMAGE_URL}/${imgName}`;
};

export const handleIcon = (iconName: string) => (
  <i className={classNames('icon', { [`icon-${iconName}`]: true })}></i>
);
