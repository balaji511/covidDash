import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="bgFooter">
    <h1 className="bgHeaderHead">
      COVID19<span>INDIA</span>
    </h1>
    <p className="footerText">
      we stand with everyone fighting on the front lines
    </p>
    <div className="iconsContainer">
      <VscGithubAlt size="2em" className="icon" />
      <FiInstagram className="icon" size="2em" />
      <FaTwitter className="icon" size="2em" />
    </div>
  </div>
)
export default Footer
