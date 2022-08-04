import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {withRouter} from 'react-router-dom'
import './index.css'

class TabItem extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    this.setState({isLoading: true})
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const {match} = this.props
      const {params} = match
      const {stateCode} = params
      const confirmReturnData = data[stateCode].total.confirmed
      const recoveredReturnData = data[stateCode].total.recovered
      const deceasedReturnData = data[stateCode].total.deceased
      const activeReturnData = parseInt(
        confirmReturnData - recoveredReturnData + deceasedReturnData,
      )
      this.setState({
        confirmedData: {
          name: 'Confirmed',
          logo:
            'https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg',
          value: confirmReturnData,
        },
        activeData: {
          name: 'Active',
          logo:
            'https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg',
          value: activeReturnData,
        },
        recoveredData: {
          name: 'Recovered',
          logo:
            'https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg',
          value: recoveredReturnData,
        },
        deceasedData: {
          name: 'Deceased',
          logo:
            'https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg',
          value: deceasedReturnData,
        },
        isLoading: true,
      })
    }
  }

  changeCategory = name => {
    const {onchangeCategory} = this.props
    onchangeCategory(name)
  }

  renderLoadingView = () => (
    <div className="bgLoader" testid="timelinesDataLoading">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {
      confirmedData,
      isLoading,
      activeData,
      recoveredData,
      deceasedData,
    } = this.state

    const {activeCategory} = this.props
    return (
      <div className="bgDfr">
        <div
          testid="stateSpecificConfirmedCasesContainer"
          className={
            confirmedData.name === activeCategory
              ? 'bgConfirmed bgEachCategoryConfirmed'
              : 'bgEachCategoryConfirmed'
          }
        >
          <p className="bgEachConfirmed">{confirmedData.name}</p>
          <img
            src={confirmedData.logo}
            onClick={() => this.changeCategory(confirmedData.name)}
            className="bgConfirmedImg"
            alt="state specific confirmed cases pic"
          />
          <p className="bgEachValue">{confirmedData.value}</p>
        </div>
        <div
          testid="stateSpecificActiveCasesContainer"
          className={
            activeData.name === activeCategory
              ? 'bgActive bgEachCategoryActive'
              : 'bgEachCategoryActive'
          }
        >
          <h1 className="bgEachConfirmed">{activeData.name}</h1>
          <img
            src={activeData.logo}
            className="bgConfirmedImg"
            onClick={() => this.changeCategory(activeData.name)}
            alt="state specific active cases pic"
          />
          <p className="bgEachValue">{activeData.value}</p>
        </div>
        <div
          testid="stateSpecificRecoveredCasesContainer"
          className={
            recoveredData.name === activeCategory
              ? 'bgRecovered bgEachCategoryRecovered'
              : 'bgEachCategoryRecovered'
          }
        >
          <h1 className="bgEachConfirmed">{recoveredData.name}</h1>
          <img
            src={recoveredData.logo}
            onClick={() => this.changeCategory(recoveredData.name)}
            className="bgConfirmedImg"
            alt="state specific recovered cases pic"
          />
          <p className="bgEachValue">{recoveredData.value}</p>
        </div>
        <div
          testid="stateSpecificDeceasedCasesContainer"
          className={
            deceasedData.name === activeCategory
              ? 'bgDeceased bgEachCategoryDeceased'
              : 'bgEachCategoryDeceased'
          }
        >
          <h1 className="bgEachConfirmed">{deceasedData.name}</h1>
          <img
            src={deceasedData.logo}
            className="bgConfirmedImg"
            onClick={() => this.changeCategory(deceasedData.name)}
            alt="state specific deceased cases pic"
          />
          <p className="bgEachValue">{deceasedData.value}</p>
        </div>
      </div>
    )
  }

  render() {
    const {
      confirmedData,
      isLoading,
      activeData,
      recoveredData,
      deceasedData,
    } = this.state

    return <ul className="bgTabsListItems">{this.renderSuccess()}</ul>
  }
}

export default withRouter(TabItem)
