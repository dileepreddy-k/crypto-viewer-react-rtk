import React from 'react';

import { Link } from 'react-router-dom';

import { CryptoCurrencies, Loader } from './index';

// Ant-design components
import { Typography, Row, Col, Statistic, Divider } from 'antd';

import millify from 'millify';

// API Services
import { useGetCryptosQuery } from '../services/cryptoApi';

import { ErrorModal } from './index';

const { Title } = Typography;

const Homepage = () => {

	const { data, isFetching, error } = useGetCryptosQuery(10);
	const stats = data?.data?.stats;
	
	if(isFetching) return <Loader />;

	if(error) return <ErrorModal data={error} stopNavigate/>

	return (
		<>
			<Title level={2}>Global Crypto Statistics</Title>
			<Row>
				<Col span={8}>
					<Statistic title="Total Cryptocurrencies" value={stats.total} />
				</Col>
				<Col span={8}>
					<Statistic title="Total Exchanges" value={millify(stats.totalExchanges)} />
				</Col>
				<Col span={8}>
					<Statistic title="Total Market Cap" value={millify(stats.totalMarketCap)} />
				</Col>
				<Col span={8}>
					<Statistic title="Total 24hr Volume" value={millify(stats.total24hVolume)} />
				</Col>
				<Col span={8}>
					<Statistic title="Total Markets" value={millify(stats.totalMarkets)} />
				</Col>
			</Row>
			<Divider />
			<Row align='middle' justify='space-between'>
				<Col>
					<Title level={2}>Top 10 Cryptocurrencies in the world</Title>
				</Col>
				<Col>
					<Link to="/cryptocurrencies" component={Typography.Link}>Show More</Link>
				</Col>
			</Row>
			<CryptoCurrencies limited/>
		</>
	)
}

export default Homepage;