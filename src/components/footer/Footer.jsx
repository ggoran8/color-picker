import React from 'react';
import { ReactComponent as Mail } from '../assets/icons/mail.svg';
import { ReactComponent as Twitter } from '../assets/icons/twitter.svg';
import { ReactComponent as Github } from '../assets/icons/github.svg';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as LinkedIn } from '../assets/icons/linkedin.svg';

import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.container}>
			<small>Made by Goran</small>
			<div>
				<a
					href='https://github.com/ggoran8'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Github />
				</a>
				<a
					href='https://www.linkedin.com/in/goran-gaj%C5%A1ek-2064382a7/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<LinkedIn />
				</a>
				<a href='#top'>
					<Home />
				</a>
				<a
					href='https://twitter.com/omnity_gg'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Twitter />
				</a>
				<a
					href='mailto: gorangajsek22@gmail.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Mail />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
