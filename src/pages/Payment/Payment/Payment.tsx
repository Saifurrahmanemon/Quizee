import { useParams } from 'react-router-dom';

function Payment() {
	const { id } = useParams();
	return <div>Payment for : {id}</div>;
}

export default Payment;
