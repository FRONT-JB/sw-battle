interface Props {
  element: string;
}

const Badge = ({ element }: Props) => {
  return (
    <span className='badge'>
      <i className={`icon icon-element-${element}`}></i>
    </span>
  );
};

export default Badge;
