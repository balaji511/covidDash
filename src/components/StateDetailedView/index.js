import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'
import TabItem from '../TabItem'
import Footer from '../Footer'
import TopDistricts from '../TopDistricts'
import SpecificChart from '../SpecificChart'
import ChartsData from '../ChartsData'

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

class StateDetailedView extends Component {
  state = {
    stateName: '',
    lastUpdated: '',
    totalTested: '',
    DistrictsData: [],
    activeCategory: 'Confirmed',
    totalOutputData: [],
    isLoading: false,
    timeLineLoader: false,
  }

  componentDidMount() {
    this.getData()
    this.getChartData()
  }

  getChartData = async () => {
    this.setState({timeLineLoader: true})
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const KeyDates = Object.keys(data[stateCode].dates)
      const RunTimeList = []
      KeyDates.map(each => {
        RunTimeList.push({
          date: each,
          confirmed: data[stateCode].dates[each].total.confirmed,
          deceased: data[stateCode].dates[each].total.deceased,
          recovered: data[stateCode].dates[each].total.recovered,
          tested: data[stateCode].dates[each].total.tested,
          active:
            parseInt(data[stateCode].dates[each].total.confirmed) -
            (parseInt(data[stateCode].dates[each].total.deceased) +
              parseInt(data[stateCode].dates[each].total.recovered)),
        })
        return RunTimeList
      })
      this.setState({
        totalOutputData: RunTimeList,
        timeLineLoader: false,
      })
    }
  }

  getData = async () => {
    this.setState({isLoading: true})
    const options = {
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data/`
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const {match} = this.props
      const {params} = match
      const {stateCode} = params
      const nameOfState = statesList.filter(
        each => each.state_code === stateCode,
      )
      const {activeCategory} = this.state
      const KeyPairs = Object.keys(data[stateCode].districts)
      const tempDataList = []
      KeyPairs.map(each => {
        if (activeCategory === 'Active') {
          tempDataList.push({
            stateName: each,
            stateValue: parseInt(
              data[stateCode].districts[each].total.confirmed -
                data[stateCode].districts[each].total.recovered +
                data[stateCode].districts[each].total.deceased,
            )
              ? parseInt(
                  data[stateCode].districts[each].total.confirmed -
                    data[stateCode].districts[each].total.recovered +
                    data[stateCode].districts[each].total.deceased,
                )
              : 0,
          })
        } else {
          tempDataList.push({
            stateName: each,
            stateValue: data[stateCode].districts[each].total[
              activeCategory.toLowerCase()
            ]
              ? data[stateCode].districts[each].total[
                  activeCategory.toLowerCase()
                ]
              : 0,
          })
        }
        return tempDataList
      })

      const lastUpdatedDate = data[stateCode].meta
      const testedCount = data[stateCode].total.tested

      this.setState({
        stateName: nameOfState[0].state_name,
        lastUpdated: new Date(lastUpdatedDate.last_updated),
        totalTested: testedCount,
        DistrictsData: tempDataList,
        isLoading: false,
      })
    }
  }

  onchangeCategory = type => {
    this.setState({activeCategory: type}, this.getData, this.getChartData)
  }

  chartsRender = () => {
    const {totalOutputData, activeCategory} = this.state
    return (
      <>
        <div className="specificChart">
          <SpecificChart
            totalOutputData={totalOutputData}
            activeCategory={activeCategory}
          />
        </div>
        <ChartsData totalOutputData={totalOutputData} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="bgLoader" testid="stateDetailsLoader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTimeLine = () => (
    <div className="bgLoader" testid="timelinesDataLoader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getSortedData = () => {
    const {DistrictsData, activeCategory} = this.state

    DistrictsData.sort((a, b) => b.stateValue - a.stateValue)
    return DistrictsData
  }

  renderSuccessView = () => {
    const {
      stateName,
      DistrictsData,
      activeCategory,
      lastUpdated,
      totalTested,
      totalOutputData,
      isLoading,
      timeLineLoader,
    } = this.state
    const sorted = this.getSortedData()

    return (
      <>
        <div className="bgStateContent">
          <div className="bgStateName">
            <h1 className="bgStateNameItem">{stateName}</h1>
            <p className="bgStateDate">
              last update date {lastUpdated.toString()}
            </p>
          </div>
          <div className="bgTestedCount">
            <p className="testedHead">Tested</p>
            <p className="testedCount">{totalTested}</p>
          </div>
        </div>
        <TabItem
          onchangeCategory={this.onchangeCategory}
          activeCategory={activeCategory}
        />
        <div className="bgDistrictsContainer">
          <h1 className="bgDistrictsHead">Top Districts</h1>
          <ul
            className="bgDistrictItemsContainer"
            testid="topDistrictsUnorderedList"
          >
            {sorted.map(each => (
              <TopDistricts details={each} key={each.stateName} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, timeLineLoader} = this.state
    return (
      <>
        <Header />
        <div className="bgStateDetailedContainer" testid="lineChartsContainer">
          {isLoading ? this.renderLoadingView() : this.renderSuccessView()}
          {timeLineLoader ? this.renderTimeLine() : this.chartsRender()}
          <Footer />
        </div>
      </>
    )
  }
}

export default StateDetailedView
