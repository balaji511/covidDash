import './index.css'

const TopDistricts = props => {
  const {details} = props
  const {stateName, stateValue} = details
  return (
    <li className="bgDistrictItem">
      <p className="bgDistrictValue">
        {stateValue === undefined ? '' : stateValue}
      </p>
      <p className="bgDistrictName">{stateName}</p>
    </li>
  )
}

export default TopDistricts
