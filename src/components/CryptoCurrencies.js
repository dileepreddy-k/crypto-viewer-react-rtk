import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import millify from 'millify';

import { Loader } from './index';

// Ant-design components
import { Card, Row, Col, Input, Typography, Avatar } from 'antd';

// Ant-design Icons
import { SearchOutlined } from '@ant-design/icons';

// API Service
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Paragraph } = Typography;

const CryptoCurrencies = ({ limited }) => {

	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const count = limited ? 10 : 100;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);

	useEffect(() => {

		const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setCryptos(filteredData);

	}, [cryptoList, searchTerm]);

	if (isFetching) return <Loader />;

	return (
		<>
			{
				!limited && (
					<Row justify='center' style={{ marginBottom: '24px' }}>
						<Col xs={24} lg={6}>
							<Input placeholder='Search Crypto Currency' onChange={(e) => setSearchTerm(e.target.value)} prefix={<SearchOutlined />} />
						</Col>
					</Row>
				)
			}
			<Row gutter={[24, 24]}>
				{
					cryptos?.map((crypto) => (
						<Col xs={24} sm={12} lg={6} key={crypto.uuid}>
							<Link to={`/crypto/${crypto.uuid}`}>
								<Card 
									title={`${crypto.name}`}
									extra={<Avatar src={crypto.iconUrl} />}
									hoverable
								>
									<Paragraph>Price: {millify(crypto.price)}</Paragraph>
									<Paragraph>Market Cap: {millify(crypto.marketCap)}</Paragraph>
									<Paragraph>Daily Change: {millify(crypto.change)}</Paragraph>
								</Card>
							</Link>
						</Col>
					))
				}
			</Row>
		</>
	)
}

export default CryptoCurrencies;