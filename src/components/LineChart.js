import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Ant-design components
import { Row, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

export const LineChart = ({ coinHistory, currentPrice, coinName }) => {

	const coinPrice = [];
	const coinTimeStamp = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		let timeStamp = coinHistory.data.history[i].timestamp + '000';
		coinTimeStamp.push(new Date(parseInt(timeStamp)).toLocaleDateString());
		coinPrice.push(coinHistory.data.history[i].price);
	}

	const data = {
		labels: coinTimeStamp,
		datasets: [
			{
				label: 'Price in USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#1890ff',
				borderColor: '#1890ff'
			}
		]
	}

	const options = {
		responsive: true
	};
	
	return (
		<>
			<Row justify='space-between' align='middle'>
				<Title level={3} style={{ color: '#1890ff' }}>{coinName} Price Chart</Title>
				<Title level={5}>Change: {coinHistory?.data?.change}%</Title>
				<Title level={5}>Current {coinName} Price: $ {currentPrice}</Title>
			</Row>
			<Line data={data} options={options}/>
		</>
	)
}
