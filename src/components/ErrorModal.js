import { Modal } from 'antd';

import { useNavigate } from "react-router-dom";

const ErrorModal = ({ data, stopNavigate }) => {

    const navigate = useNavigate();

    Modal.error({
        title: `Error ${data.status}`,
        content: data.data.message || 'Something went wrong',
        onOk() {
            Modal.destroyAll();
            if(!stopNavigate) navigate('/');
        }
    })
}

export default ErrorModal