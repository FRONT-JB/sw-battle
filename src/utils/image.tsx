import { BASE_IMAGE_URL } from '~/constants/monster';

export const handleReplaceURL = (imgName: string) => {
  return `${BASE_IMAGE_URL}/${imgName}`;
};

export const handleIcon = (iconName: string) => (
  <i className={`icon icon-${iconName}`}></i>
);
