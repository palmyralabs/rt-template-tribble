
import './Topbar.css';

interface TopbarProps {
  mobileOpen?: boolean,
  setMobileOpen?: any,
  display?: any
}

const Topbar: React.FC<TopbarProps> = ({ mobileOpen, setMobileOpen, display }) => {

  return (
    <div className='topbar'>top bar</div>
  );
};

export default Topbar;