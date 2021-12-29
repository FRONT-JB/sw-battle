import { useNavigate } from 'react-router-dom';
import { NAVIGATE_PATH } from '~/constants/navigate';

const NavigateBar = () => {
  const navigate = useNavigate();
  return (
    <div className='navigator'>
      <button
        type='button'
        className='btn btn-prev'
        onClick={() => navigate(NAVIGATE_PATH.PREV)}
      >
        <span className='btn__label'>Go Back</span>
      </button>
    </div>
  );
};

export default NavigateBar;
