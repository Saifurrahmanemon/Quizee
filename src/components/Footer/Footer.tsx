import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons';
import { useStyles } from './Footer.style';

function Footer() {
	const { classes } = useStyles();
	const date = new Date();
	const year = date.getFullYear();
	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Text color='dimmed' size='sm'>
					{year} mantine.dev. All rights reserved.
				</Text>
				<Group spacing={0} className={classes.links} position='right' noWrap>
					<ActionIcon size='lg'>
						<IconBrandTwitter size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size='lg'>
						<IconBrandYoutube size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size='lg'>
						<IconBrandInstagram size={18} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	);
}

export default Footer;
