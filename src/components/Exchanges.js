import React from 'react';

// API Service
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';

import { Loader, ErrorModal } from './index';

const Exchanges = () => {
	
	const { isFetching, error } = useGetCryptoExchangesQuery();

	if(isFetching) return <Loader />;

	if(error) return <ErrorModal data={error}/>;

	return (
		<div>Exchanges</div>
	)
}

export default Exchanges;