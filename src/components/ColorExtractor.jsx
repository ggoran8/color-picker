import React, { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';
import styles from './ColorExtractor.module.css';
import { colornames } from 'color-name-list';
import CopyHexName from './CopyHexName';

function ColorExtractor() {
	const [imageUrl, setImageUrl] = useState(null);
	const [colors, setColors] = useState([]);
	const imgRef = useRef(null);
	const dropZoneRef = useRef(null); // For the drag-and-drop area

	function hexToRgb(hex) {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return [r, g, b];
	}

	function colorDistance(rgb1, rgb2) {
		return Math.sqrt(
			Math.pow(rgb1[0] - rgb2[0], 2) +
				Math.pow(rgb1[1] - rgb2[1], 2) +
				Math.pow(rgb1[2] - rgb2[2], 2)
		);
	}

	function getClosestColorName(hex) {
		const rgb = hexToRgb(hex);
		let closestColor = colornames[0];
		let minDistance = Infinity;

		for (const color of colornames) {
			const colorRgb = hexToRgb(color.hex);
			const distance = colorDistance(rgb, colorRgb);
			if (distance < minDistance) {
				minDistance = distance;
				closestColor = color;
			}
		}

		return closestColor.name;
	}

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setImageUrl(url);
		}
	};

	const extractColors = () => {
		if (!imgRef.current) return;

		const colorThief = new ColorThief();
		if (imgRef.current.complete) {
			const palette = colorThief.getPalette(imgRef.current, 5);
			const hexColors = palette.map(
				(rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('')
			);
			setColors(hexColors);
		} else {
			imgRef.current.onload = () => extractColors();
		}
	};

	// Set up drag and drop events
	useEffect(() => {
		const dropZone = dropZoneRef.current;

		const handleDragOver = (e) => {
			e.preventDefault();
			e.stopPropagation();
			dropZone.classList.add(styles.dragOver);
		};

		const handleDragLeave = () => {
			dropZone.classList.remove(styles.dragOver);
		};

		const handleDrop = (e) => {
			e.preventDefault();
			e.stopPropagation();
			dropZone.classList.remove(styles.dragOver);

			const file = e.dataTransfer.files[0];
			if (file) {
				const url = URL.createObjectURL(file);
				setImageUrl(url);
			}
		};

		dropZone.addEventListener('dragover', handleDragOver);
		dropZone.addEventListener('dragleave', handleDragLeave);
		dropZone.addEventListener('drop', handleDrop);

		return () => {
			dropZone.removeEventListener('dragover', handleDragOver);
			dropZone.removeEventListener('dragleave', handleDragLeave);
			dropZone.removeEventListener('drop', handleDrop);
		};
	}, []);

	return (
		<div className={styles.extractorWrapper}>
			<h2>Extract from an image</h2>
			<div
				ref={dropZoneRef}
				className={styles.uploadWrapper}
				onClick={() => dropZoneRef.current.querySelector('input').click()} // Trigger file input click
			>
				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
					className={styles.uploadInput}
				/>
				<p>Upload an image</p>
			</div>

			{imageUrl && (
				<>
					<img
						ref={imgRef}
						src={imageUrl}
						crossOrigin='anonymous'
						alt='Uploaded'
						className={styles.imagePreview}
						onLoad={extractColors}
					/>
					<div className={styles.colorSwatches}>
						{colors.map((color, idx) => (
							<div key={idx} className={styles.colorSwatchWrapper}>
								<CopyHexName color={color} />
								<div
									className={styles.colorSwatch}
									style={{ backgroundColor: color }}
									title={color}
								></div>
								<p className={styles.colorName}>{getClosestColorName(color)}</p>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default ColorExtractor;
