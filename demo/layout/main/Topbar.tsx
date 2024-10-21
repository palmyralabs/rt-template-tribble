
import './Topbar.css';
import { ProfileIcon } from '../../../src/main';

interface TopbarProps {
  mobileOpen?: boolean,
  setMobileOpen?: any,
  display?: any
}

const Topbar: React.FC<TopbarProps> = ({ mobileOpen, setMobileOpen, display }) => {


  const boxWidth = mobileOpen ? 'calc(100%)' : 'calc(100% - 260px)';

  return (
    <div className='topbar'>
      <ProfileIcon displayName='guest' />
    </div>
  );
};

export default Topbar;