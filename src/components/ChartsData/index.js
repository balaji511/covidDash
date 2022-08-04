import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import './index.css'

const ChartsData = props => {
  const {totalOutputData} = props

  return (
    <div className="bgChartsContainer" testid="lineChartsContainer">
      <h1 className="bgConfirmedHeader">Daily Spread Trends</h1>
      <div className="bgConfirmedChart">
        <LineChart
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          height={250}
          width={700}
          data={totalOutputData}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{padding: 15}} />
          <Line type="monotone" dataKey="confirmed" stroke="gray" />
        </LineChart>
      </div>
      <div className="bgActiveChart">
        <LineChart
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          height={250}
          width={700}
          data={totalOutputData}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="active" stroke="gray" />{' '}
          <Legend wrapperStyle={{padding: 15}} />
        </LineChart>
      </div>
      <div className="bgRecoveredChart">
        <LineChart
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          height={250}
          width={700}
          data={totalOutputData}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="recovered" stroke="gray" />
          <Legend wrapperStyle={{padding: 15}} />
        </LineChart>
      </div>
      <div className="bgDeceasedChart">
        <LineChart
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          height={250}
          width={700}
          data={totalOutputData}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="deceased" stroke="gray" />
          <Legend wrapperStyle={{padding: 15}} />
        </LineChart>
      </div>
      <div className="bgTestedChart">
        <LineChart
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          height={250}
          width={700}
          data={totalOutputData}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{padding: 15}} />
          <Line type="monotone" dataKey="tested" stroke="gray" />
        </LineChart>
      </div>
    </div>
  )
}

export default ChartsData
