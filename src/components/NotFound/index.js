import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const RedirectTo = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="bgFailureContainer">
      <img
        src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Group_7484_broozo.svg"
        className="bgFailure"
        alt="not-found-pic"
      />
      <h1 className="bgFailureHead">Page Not Found</h1>
      <p className="bgFailureDes">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" onClick={RedirectTo} className="bgHomeButton">
        Home
      </button>
    </div>
  )
}

export default withRouter(NotFound)
