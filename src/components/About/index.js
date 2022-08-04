import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'
import AboutQuestionItem from '../AboutItem'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class About extends Component {
  state = {aboutData: [], apiStatus: apiConstant.initial}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const options = {method: 'GET'}
    const response = await fetch('https://apis.ccbp.in/covid19-faqs', options)

    if (response.ok) {
      const data = await response.json()
      this.setState({aboutData: data.faq, apiStatus: apiConstant.success})
    }
  }

  renderAboutData = () => {
    const {aboutData} = this.state
    return (
      <ul className="bgAboutQuestions" testid="faqsUnorderedList">
        {aboutData.map(each => (
          <AboutQuestionItem details={each} key={each.question} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="bgLoaderView" testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderEndResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderAboutData()
      case apiConstant.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {aboutData} = this.state
    console.log(aboutData)
    return (
      <div className="bgAboutContainer">
        <Header />
        <div className="bgAboutContent">
          <h1 className="bgAboutHead">About</h1>
          <p className="bgAboutLast">Last update on march 28th 2021.</p>
          <h1 className="bgAboutDis">
            COVID-19 vaccines be ready for distribution
          </h1>
          <div className="divContainer">{this.renderEndResult()}</div>
        </div>
      </div>
    )
  }
}

export default About
