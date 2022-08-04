import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="bgHeader">
    <Link to="/" className="Link">
      <h1 className="bgHeaderHead">
        COVID19<span>INDIA</span>
      </h1>
    </Link>
    <ul className="bgHeaderNav">
      <Link to="/" className="Link">
        <li className="navHead">Home</li>
      </Link>
      <Link to="/about" className="Link">
        <li className="navHead">About</li>
      </Link>
    </ul>
  </div>
)

export default Header
