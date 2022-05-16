import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Ant-design components
import { Layout, Typography, Row } from 'antd';

// Custom Components
import { NavBar, Homepage, Exchanges, CryptoCurrencies, CryptoDetails } from './components';

const { Footer, Sider, Content, Header } = Layout;

const App = () => {

	return (
		<Layout>
			<Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0 }} className="hidden-md">
				<NavBar/>
			</Sider>
			<Layout>
				<Header className='app-header show-md'>
					<Row align='middle' justify="space-between">
						<NavBar fixed="navbar-fixed"/>
					</Row>
				</Header>
				<Content style={{ padding: '24px', marginLeft: '200px' }} className="layout-content">
					{/* Routes */}
					<Routes>
						<Route exact path="/" element={<Homepage />}/>
						<Route exact path="/exchanges" element={<Exchanges />}/>
						<Route exact path="/cryptocurrencies" element={<CryptoCurrencies />}/>
						<Route exact path="/crypto/:coinId" element={<CryptoDetails />}/>
					</Routes>

					<Footer>
						<Typography.Title level={5} style={{ textAlign: 'center'}}>
							All rights reserved
						</Typography.Title>
					</Footer>
				</Content>
			</Layout>			
		</Layout>
	)
}

export default App;