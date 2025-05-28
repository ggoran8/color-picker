import styles from './ColorBox.module.css';
import CopyHexName from './CopyHexName';

function ColorBox({ color, index, locked, onColorChange, onToggleLock }) {
	return (
		<div className={styles.colorBox}>
			<div className={styles.square} style={{ backgroundColor: color }}>
				{!locked && (
					<input
						type='color'
						value={color}
						onChange={(e) => onColorChange(index, e.target.value)}
						className={styles.colorInput}
					/>
				)}
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation();
					onToggleLock(index);
				}}
				className={`${styles.lockButton} ${locked ? styles.locked : ''}`}
			>
				{locked ? '🔒' : '🔓'}
			</button>

			<CopyHexName color={color} />
		</div>
	);
}

export default ColorBox;
