interface Props {
  isFullSize?: boolean;
}

const Loading = ({ isFullSize = false }: Props) => {
  if (isFullSize) {
    return (
      <div className='loading-container'>
        <div className='loading'>
          <div className='loading__item'></div>
          <div className='loading__item'></div>
        </div>
      </div>
    );
  }
  return (
    <div className='loading'>
      <div className='loading__item'></div>
      <div className='loading__item'></div>
    </div>
  );
};

export default Loading;
