import { useState } from 'react';
import styles from './PresetSelector.module.css';
import CopyHexName from './CopyHexName';

const presets = {
	Warm: ['#FF6F61', '#FFB88C', '#FFD3B6', '#FFAAA5', '#FF8C94'],
	Cool: ['#92A8D1', '#B3CDE0', '#A2D5F2', '#ACE7EF', '#E0F7FA'],
	Nature: ['#3E8E41', '#A8D5BA', '#E6F9AF', '#D0E6A5', '#86B8B1'],
};

function PresetSelector() {
	const [selectedPreset, setSelectedPreset] = useState({
		name: 'Warm',
		colors: presets.Warm,
	});

	return (
		<div className={styles.container}>
			<p className={styles.label}>Select a preset palette:</p>
			<div className={styles.buttonGroup}>
				{Object.entries(presets).map(([name, colors]) => (
					<button
						key={name}
						className={styles.presetButton}
						onClick={() => setSelectedPreset({ name, colors })}
					>
						{name}
					</button>
				))}
			</div>

			{selectedPreset && (
				<div className={styles.paletteDisplay}>
					<p className={styles.presetName}>
						<strong>{selectedPreset.name} Palette</strong>
					</p>
					<div className={styles.colorSwatches}>
						{selectedPreset.colors.map((color, index) => (
							<div key={index} className={styles.swatchWrapper}>
								<div
									key={index}
									className={styles.swatch}
									style={{ backgroundColor: color }}
									title={color}
								/>
								<CopyHexName color={color} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default PresetSelector;
