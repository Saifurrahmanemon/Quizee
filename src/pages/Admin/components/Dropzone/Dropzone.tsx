import { Text } from '@mantine/core';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Loading from '../../../../components/Loading';
import { useStyles } from '../../CreateQuizes/CreateQuizes.style';

const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMGBB_API_KEY}`;

type DropzoneProps = {
	setImage: (value: string) => void;
};

function Dropzone({ setImage }: DropzoneProps) {
	const [loading, setLoading] = useState(false);
	const { classes } = useStyles();

	const onDrop = useCallback(async (acceptedFiles: (string | Blob)[]) => {
		setLoading(true);
		const formData = new FormData();
		formData.append('image', acceptedFiles[0]); // has to be named 'image'!
		const res = await axios.post(url, formData);
		const imageUrl = res.data.data.url;
		setImage(imageUrl);
		setLoading(false);
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
		onDrop,
		accept: {
			'image/png': ['.png', '.jpeg', '.bmp', '.jpg', '.avif'],
		},
	});

	const showFile = loading ? <Loading /> : <Text>{acceptedFiles[0]?.name}</Text>;

	return (
		<div className={classes.dropzone} {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag and drop your image here, or click to select files</p>
			)}
			{showFile}
		</div>
	);
}

export default Dropzone;
