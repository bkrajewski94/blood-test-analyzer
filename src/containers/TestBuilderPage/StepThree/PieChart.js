const { PieChart, Pie, Sector, Cell } = Recharts;
const data = [
{name: 'Group A', value: 400}, 
{name: 'Group B', value: 400},
{name: 'Group C', value: 400}, 
{name: 'Group D', value: 400},
{name: 'Group D', value: 400}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c42700'];

const RADIAN = Math.PI / 180;                    

const SimplePieChart = React.createClass({
	render () {
  	return (
    	<PieChart width={210} height={210} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={100} 
          cy={100} 
          outerRadius={100} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      
    );
  }
})

ReactDOM.render(
  <SimplePieChart />,
  document.getElementById('container')
);
