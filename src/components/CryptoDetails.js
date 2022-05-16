import React, { useState } from 'react';

import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';

// Ant-design components
import { Col, Row, Typography, Radio, Divider } from 'antd';

// Ant-design icons
import { DollarCircleOutlined, NumberOutlined, ThunderboltOutlined, TrophyOutlined, FundOutlined, MoneyCollectOutlined, CheckOutlined, StopOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// API Service
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

import { LineChart } from './LineChart';

import { Loader, ErrorModal } from './index';

const { Title, Text, Paragraph, Link } = Typography;

const CryptoDetails = () => {

	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState('24h');

	const { data, isFetching, error } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});

	const cryptoDetails = data?.data?.coin;
	
	if(isFetching) return <Loader />;

	if(error) return <ErrorModal data={error}/>

	const stats = [
		{ title: 'Price to USD', value: `$${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
		{ title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
		{ title: '24h Volume', value: `$${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
		{ title: 'Market Cap', value: `$${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
		{ title: 'All-time-high(daily avg.)', value: `$${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
	];

	const genericStats = [
		{ title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
		{ title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
		{ title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
		{ title: 'Total Supply', value: `$${cryptoDetails.supply.total && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
		{ title: 'Circulating Supply', value: `$${cryptoDetails.supply.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
	];

	return (
		<>
			<Title level={2}>{cryptoDetails.name} ({cryptoDetails.symbol})</Title>
			<Radio.Group onChange={(e) => setTimePeriod(e.target.value)} defaultValue="24h">
				<Radio.Button value="3h">3 Hours</Radio.Button>
				<Radio.Button value="24h">24 Hours</Radio.Button>
				<Radio.Button value="7d">7 Days</Radio.Button>
				<Radio.Button value="30d">30 Days</Radio.Button>
				<Radio.Button value="3m">3 Months</Radio.Button>
				<Radio.Button value="1y">1 Year</Radio.Button>
				<Radio.Button value="3y">3 Years</Radio.Button>
				<Radio.Button value="5y">5 Years</Radio.Button>
			</Radio.Group>
			<LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
			<Divider />
			<Row justify='space-between' gutter={[24, 24]}>
				<Col xs={24} md={12}>
					<Title level={3}>{cryptoDetails.name} Value Statistics</Title>
					<Paragraph>An overview showing the stats of {cryptoDetails.name}</Paragraph>
					<StatsTable data={stats} />
				</Col>
				<Col xs={24} md={12}>
					<Title level={3}>Other Statistics</Title>
					<Paragraph>An overview showing the stats of all cryptocurrencies</Paragraph>
					<StatsTable data={genericStats} />
				</Col>
				<Col xs={24} md={12}>
					{ HTMLReactParser(cryptoDetails.description) }
				</Col>
				<Col xs={24} md={12}>
					<Title level={3}>{cryptoDetails.name} Links</Title>
					{
						cryptoDetails.links.map((link) => (
							<Row key={link.name} align='middle' justify='space-between' style={{ padding: '20px 8px', borderBottom: '1px solid #ddd'}}>
								<Text style={{ fontWeight: 'bold', textTransform: 'capitalize'}}>{link.type}</Text>
								<Link href={link.url} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold'}}>{link.name}</Link>
							</Row>
						))
					}
				</Col>
			</Row>
		</>
	)
}

const StatsTable = (props) => {

	const { data } = props;
	
	return (
		data.map(({title, value, icon}) => (
			<>
				<Row align='middle' style={{ padding: '20px 8px', borderBottom: '1px solid #ddd'}}>
					<Col xs={20}>
						<Text style={{ marginRight: '8px'}}>{icon}</Text>
						<Text>{title}</Text>
					</Col>
					<Col xs={4}>
						<Text style={{ fontWeight: 'bold'}}>{value}</Text>
					</Col>
				</Row>
			</>
		))
	)
}

export default CryptoDetails;