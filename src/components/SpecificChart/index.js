import {BarChart, Bar, XAxis, Legend, Tooltip} from 'recharts'
import './index.css'

const SpecificChart = props => {
  const {totalOutputData, activeCategory} = props
  const barChartType = activeCategory.toLowerCase()
  const finalList = totalOutputData.slice(
    totalOutputData.length - 10,
    totalOutputData.length,
  )

  let colortype = '#9A0E31'
  if (barChartType === 'confirmed') {
    colortype = '#9A0E31'
  } else if (barChartType === 'active') {
    colortype = '#0A4FA0'
  } else if (barChartType === 'recovered') {
    colortype = '#216837'
  } else if (barChartType === 'deceased') {
    colortype = '#474C57'
  }

  return (
    <BarChart width={850} height={350} data={finalList} barSize={65}>
      <XAxis
        dataKey="date"
        stroke={`${colortype}`}
        style={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
        dy={5}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey={`${barChartType}`}
        fill={`${colortype}`}
        label={{
          position: 'top',
          fontSize: 15,
          fontWeight: 200,
          fill: '#fff',
        }}
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  )
}

export default SpecificChart
