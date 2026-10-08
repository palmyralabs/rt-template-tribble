
import './Topbar.css';
import { ProfileIcon } from '../../../src/main';
import SettingsPanel from './SettingsPanel';

interface TopbarProps {
  mobileOpen?: boolean,
  setMobileOpen?: any,
  display?: any
}

const Topbar: React.FC<TopbarProps> = ({ mobileOpen, setMobileOpen, display }) => {


  const boxWidth = mobileOpen ? 'calc(100%)' : 'calc(100% - 260px)';

  return (
    <div className='topbar'>
      <div className='topbar-right'>
        <SettingsPanel />
        <ProfileIcon displayName='guest' />
      </div>
    </div>
  );
};

export default Topbar;