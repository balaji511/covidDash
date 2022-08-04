import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const IncludingListItem = props => {
  const {details} = props
  const {stateName, stateCode} = details
  return (
    <Link className="Linked" to={`/state/${stateCode}`}>
      <li className="includingListItem">
        <h1 className="includingListHead">{stateName}</h1>
        <div className="includingCode">
          <h1 className="includingHeadCode">{stateCode}</h1>
          <BiChevronRightSquare className="includingListIcon" />
        </div>
      </li>{' '}
      <hr className="line2" />
    </Link>
  )
}

export default IncludingListItem
