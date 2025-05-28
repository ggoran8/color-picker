import React, { useState, useEffect } from 'react';
import styles from './PresetColors.module.css';
import CopyHexName from './CopyHexName';

function PresetColors() {
	const [presetPalettes, setPresetPalettes] = useState({});

	useEffect(() => {
		const models = ['default', 'ui', 'material', 'website', 'fashion'];

		Promise.all(
			models.map((model) =>
				fetch('https://color-picker-w17a.onrender.com/palette', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ model }),
				})
					.then((res) => res.json())
					.then((data) => ({
						model,
						colors: data.result.map(
							(rgb) =>
								`#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`
						),
					}))
			)
		).then((palettes) => {
			const allPresets = {};
			palettes.forEach(({ model, colors }) => {
				allPresets[model] = colors;
			});
			setPresetPalettes(allPresets);
		});
	}, []);

	return (
		<div className={styles.presetsSection}>
			<h2>Preset Palettes</h2>
			{Object.entries(presetPalettes).map(([model, colors]) => (
				<div key={model} className={styles.presetBlock}>
					<p className={styles.presetTitle}>{model.toUpperCase()}</p>
					<div className={styles.presetPalette}>
						{colors.map((color, idx) => (
							<div key={idx} className={styles.presetColorWrapper}>
								<div
									className={styles.presetColor}
									style={{ backgroundColor: color }}
								></div>
								<CopyHexName color={color} />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PresetColors;
