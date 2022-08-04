import {Link} from 'react-router-dom'
import './index.css'

const StatesListItem = props => {
  const {details} = props
  const {
    confirmed,
    deceased,

    population,
    recovered,
    stateCode,
    stateName,
  } = details
  const active = parseInt(confirmed) - parseInt(recovered) + parseInt(deceased)

  return (
    <Link to={`/state/${stateCode}`} className="Linked">
      <li className="bgListHeader">
        <p className="listItemName">{stateName}</p>
        <p className="ListConfirmed">{confirmed}</p>
        <p className="ListActive">{active}</p>
        <p className="ListRecovered">{recovered}</p>
        <p className="ListDeceased">{deceased}</p>
        <p className="ListPopulation">{population}</p>
      </li>
    </Link>
  )
}

export default StatesListItem
