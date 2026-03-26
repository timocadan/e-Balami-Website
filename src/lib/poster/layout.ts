export type Rect = { x: number; y: number; w: number; h: number };

export type PosterLayout = {
	output: { size: number };
	template: { url: string };
	photoBox: Rect;
	photoStyle?: {
		/**
		 * Optional styling when the template does NOT already include a photo frame.
		 * If omitted, the photo is drawn directly into `photoBox` as a hard rectangle.
		 */
		padding: number;
		radius: number;
		borderWidth: number;
		borderColor: string;
		shadowColor: string;
		shadowBlur: number;
		shadowOffsetX: number;
		shadowOffsetY: number;
	};
	nameBox: Rect;
	nameStyle: {
		color: string;
		fontFamily: string;
		fontWeight: number | string;
		// Start size for auto-fit; renderer will shrink to fit.
		fontSize: number;
		minFontSize: number;
		paddingX: number;
	};
};

/**
 * IMPORTANT:
 * These coordinates will likely need 1 quick tuning pass with your real template file.
 * Use the Debug overlay toggle on `/dhalinyaro` to adjust `photoBox` and `nameBox`.
 */
export const posterLayout: PosterLayout = {
	output: { size: 1080 },
	template: {
		// Put your template file in: `static/dhalinyaro/`
		// Example: `static/dhalinyaro/template.jpg` -> url `/dhalinyaro/template.jpg`
		url: '/dhalinyaro/template.jpg'
	},

	// Tuned for `static/dhalinyaro/template.jpg`
	// Smaller, slightly portrait photo (taller than wide) to match the reference look.
	// Align left edge with the main heading text start (auto-measured ~x=224 from the template).
	photoBox: { x: 224, y: 360, w: 260, h: 330 },
	photoStyle: {
		padding: 10,
		radius: 18,
		borderWidth: 8,
		// Sampled from the template orange accent line: #ECAA49
		borderColor: '#ECAA49',
		shadowColor: 'rgba(0,0,0,0.25)',
		shadowBlur: 18,
		shadowOffsetX: 0,
		shadowOffsetY: 10
	},

	// Place the name just under the orange “2026” text (auto-measured maxY≈585).
	// This keeps it on the blue background (so white text is readable).
	// NOTE: The template has a blurred pill bar that extends down to ~y=646; place name below it.
	// Align horizontally with the right-side text block (auto-measured x≈552..841).
	nameBox: { x: 552, y: 668, w: 290, h: 48 },

	nameStyle: {
		color: '#FFFFFF',
		fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
		fontWeight: 900,
		fontSize: 32,
		minFontSize: 14,
		paddingX: 12
	}
};


