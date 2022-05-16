import React from 'react';

import { Spin, Row } from 'antd';

const Loader = () => {
    return (
        <>
            <Row align='middle' justify='center' style={{ height: '50vh'}}>
                <Spin />
            </Row>
        </>
    )
}

export default Loader;