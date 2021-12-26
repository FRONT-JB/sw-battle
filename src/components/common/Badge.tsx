interface Props {
  element: 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';
}

const Badge = ({ element }: Props) => {
  return (
    <span className='badge'>
      <i className={`icon icon-element-${element}`}></i>
    </span>
  );
};

export default Badge;
