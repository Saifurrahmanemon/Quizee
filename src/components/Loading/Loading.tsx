import { Center, Loader, LoaderProps } from '@mantine/core';

const Loading = (props: JSX.IntrinsicAttributes & LoaderProps) => {
	return (
		<Center my='xl'>
			<Loader variant='bars' {...props} />
		</Center>
	);
};

export default Loading;
