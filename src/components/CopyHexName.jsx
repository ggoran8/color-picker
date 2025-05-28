import { useState } from 'react';
import styles from './CopyHexName.module.css';

function CopyHexName({ color }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(color);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	return (
		<p
			className={styles.hexLabel}
			onClick={handleCopy}
			title={`Click to copy ${color}`}
			style={{ cursor: 'pointer' }}
		>
			{copied ? 'Copied!' : color}
		</p>
	);
}

export default CopyHexName;
