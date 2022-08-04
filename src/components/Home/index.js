import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'
import StatesListItem from '../StatesListItem'
import IncludingListItem from '../IncludingItem'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiConstantStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    inputForm: '',
    statesListData: [],
    confirmed: 0,
    recovered: 0,
    active: 0,
    deceased: 0,
    includingList: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getStatesData()
  }

  getStatesData = async () => {
    this.setState({apiStatus: apiConstantStatus.loading})
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
      options,
    )
    if (response.ok) {
      const data = await response.json()

      let confirmedCases = 0
      let RecoveredCases = 0
      let DeceasedCases = 0

      statesList.forEach(each => {
        if (data[each.state_code]) {
          const {total} = data[each.state_code]
          confirmedCases += total.confirmed
          RecoveredCases += total.recovered
          DeceasedCases += total.deceased
        }

        return confirmedCases
      })
      const states = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].meta.population),
      }))

      const ActiveCases = confirmedCases - (RecoveredCases + DeceasedCases)

      this.setState({
        statesListData: states,
        active: ActiveCases,
        recovered: RecoveredCases,
        confirmed: confirmedCases,
        deceased: DeceasedCases,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  inputChanged = event => {
    const {inputForm, statesListData} = this.state
    const FilteredData = statesListData.filter(each =>
      each.stateName.toLowerCase().includes(inputForm),
    )
    this.setState({includingList: FilteredData, inputForm: event.target.value})
  }

  AscendingSort = () => {
    const {statesListData} = this.state
    if (statesListData[0].stateName !== 'Andaman and Nicobar Islands') {
      const newList = statesListData.reverse()
      this.setState({statesListData: newList})
    }
  }

  DescendingSort = () => {
    const {statesListData} = this.state
    if (statesListData[0].stateName === 'Andaman and Nicobar Islands') {
      const newList = statesListData.reverse()
      this.setState({statesListData: newList})
    }
  }

  renderData = () => {
    const {statesListData, active, deceased, recovered, confirmed} = this.state

    return (
      <div>
        <div className="div">
          <div className="bgStatusContainers">
            <div className="bgConfirmedHome" testid="countryWideConfirmedCases">
              <p className="bgConfirmedHead">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Group_1_mj2csf.png"
                className="bgStatusLogo"
                alt="country wide confirmed cases pic"
              />
              <p className="bgConfirmedCount">{confirmed}</p>
            </div>

            <div className="bgActiveHome" testid="countryWideActiveCases">
              <p className="bgConfirmedHead">Active</p>
              <img
                src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/protection_1_fpiq7a.png"
                className="bgStatusLogo"
                alt="country wide active cases pic"
              />
              <p className="bgConfirmedCount">{active}</p>
            </div>

            <div className="bgRecoveredHome" testid="countryWideRecoveredCases">
              <p className="bgConfirmedHead">Recovered</p>
              <img
                src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/recovered_1_ncpaeu.png"
                className="bgStatusLogo"
                alt="country wide recovered cases pic"
              />
              <p className="bgConfirmedCount">{recovered}</p>
            </div>

            <div className="bgDeceasedHome" testid="countryWideDeceasedCases">
              <p className="bgConfirmedHead">Deceased</p>
              <img
                src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Corona_Virus_Symptoms_Shortness_of_breath_c0kgnn.png"
                className="bgStatusLogo"
                alt="country wide deceased cases pic"
              />
              <p className="bgConfirmedCount">{deceased}</p>
            </div>
          </div>
          <div className="bgList" testid="stateWiseCovidDataTable">
            <div className="bgListHeaderOptions">
              <p className="headState">
                <button
                  type="button"
                  className="bgBtn"
                  testid="ascendingSort"
                  onClick={this.AscendingSort}
                >
                  <FcGenericSortingAsc />
                </button>
                States/UT
                <button
                  type="button"
                  testid="descendingSort"
                  onClick={this.DescendingSort}
                  className="bgBtn"
                >
                  <FcGenericSortingDesc />
                </button>
              </p>
              <p className="headConfirmed">Confirmed</p>
              <p className="headActive">Active</p>
              <p className="headActive">Recovered</p>
              <p className="headDeceased">Deceased</p>
              <p className="headPopulation">Population</p>
            </div>
            <hr className="line" />
            <ul>
              {statesListData.map(each => (
                <StatesListItem details={each} key={each.stateCode} />
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  redirectToHome = () => {
    const {history} = this.props

    history.push('/')
  }

  renderFailureView = () => (
    <div className="bgFailureContainer">
      <img
        src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Group_7484_broozo.svg"
        className="bgFailure"
        alt="failure"
      />
      <h1 className="bgFailureHead">Page Not Found</h1>
      <p className="bgFailureDes">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button
        type="button"
        onClick={this.redirectToHome}
        className="bgHomeButton"
      >
        Home
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="bgLoader" testid="homeRouteLoader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFinalOutPut = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderData()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  ListEmpty = () => {
    this.setState({includingList: [], inputForm: ''})
  }

  render() {
    const {inputForm, includingList} = this.state

    return (
      <div className="bgContainer">
        <Header />
        <div className="bgSearchContainer">
          <BsSearch className="bgSearchIcon" />
          <input
            type="search"
            onChange={this.inputChanged}
            placeholder="Enter the State"
            value={inputForm}
            onAbort={this.ListEmpty}
          />
        </div>
        <ul className="bgIncludingList" testid="searchResultsUnorderedList">
          {includingList.map(each => (
            <IncludingListItem details={each} key={each.stateCode} />
          ))}
        </ul>
        <div className="div">{this.renderFinalOutPut()}</div>
      </div>
    )
  }
}

export default Home
