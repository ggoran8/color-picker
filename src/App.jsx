import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './App.module.css';
import { useRef } from 'react';
import ColorExtractor from './components/ColorExtractor';
import Footer from './components/footer/Footer';
import PresetSelector from './components/PresetSelector';
import PresetColors from './components/PresetColors';
import { ReactComponent as Locked } from '../src/components/assets/icons/locked.svg';
import { ReactComponent as Unlocked } from '../src/components/assets/icons/unlocked.svg';
import CopyHexName from './components/CopyHexName';

function App() {
	const [colors, setColors] = useState([]);
	const [lockedColors, setLockedColors] = useState(new Array(5).fill(false));
	const [showPickerIndex, setShowPickerIndex] = useState(null);
	const pickerRef = useRef(null);

	const fetchPalette = () => {
		fetch('https://color-picker-w17a.onrender.com', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model: 'default' }),
		})
			.then((res) => res.json())
			.then((data) => {
				const randomColors = data.result || [];
				const updated = randomColors.map((rgb, index) => {
					if (!lockedColors[index]) {
						return `#${rgb
							.map((v) => v.toString(16).padStart(2, '0'))
							.join('')}`;
					}
					return colors[index];
				});
				setColors(updated);
			})
			.catch((err) => console.error('Error fetching palette:', err));
	};

	useEffect(() => {
		fetchPalette();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleLock = (index) => {
		const newLocks = [...lockedColors];
		newLocks[index] = !newLocks[index];
		setLockedColors(newLocks);
	};

	const handleColorChange = (index, newColor) => {
		const newColors = [...colors];
		newColors[index] = newColor;
		setColors(newColors);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (pickerRef.current && !pickerRef.current.contains(event.target)) {
				setShowPickerIndex(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.colorGeneratorContainer}>
				<h1 className={styles.heading}>
					Color Palette <br /> Generator
				</h1>

				<p>Create color schemes with ease</p>
			</div>

			<div className={styles.buttonContainer}>
				<p>Generate a random palette</p>
				<button onClick={fetchPalette} className={styles.headingButton}>
					New Palette
				</button>
			</div>

			<div className={styles.palette}>
				{colors.map((color, index) => (
					<div key={index} className={styles.colorWrapper}>
						<div
							className={styles.colorBox}
							style={{ backgroundColor: color }}
							onClick={() => {
								if (!lockedColors[index]) {
									setShowPickerIndex(showPickerIndex === index ? null : index);
								}
							}}
						/>

						{showPickerIndex === index && !lockedColors[index] && (
							<div ref={pickerRef} className={styles.pickerWrapper}>
								<HexColorPicker
									color={color}
									onChange={(newColor) => handleColorChange(index, newColor)}
								/>
								<p className={styles.pickerColorValue}>{color}</p>
							</div>
						)}

						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleLock(index);
								setShowPickerIndex(null);
							}}
							className={`${styles.lockButton} ${
								lockedColors[index] ? styles.locked : ''
							}`}
						>
							{lockedColors[index] ? <Locked /> : <Unlocked />}
						</button>

						<CopyHexName color={color} />
					</div>
				))}
			</div>

			<hr />

			<ColorExtractor />

			<hr />

			<PresetColors />

			<hr />

			<PresetSelector />

			<hr />

			<Footer />
		</div>
	);
}

export default App;
