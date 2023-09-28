import { Link } from 'react-router-dom';
import './topBar.css';

function Topbar() {
  return (
    <nav className="topbar">
      <ul className="topbar-nav">
        <li className="topbar-item">
          <Link to="/" className="topbar-link">Home</Link>
        </li>
        <li className="topbar-item">
          <Link to="/kennel" className="topbar-link">Kennel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;