import { ReactStyleSheet } from "../../src/style/index";

export const THEME = {
	primary: "#66f",
	secondary: "#fa0",
} as const;

const createUtilSSInput = () => ({
	flex: {
		display: "flex",
		"align-items": "center",
	},
	justifyEnd: {
		"justify-content": "flex-end",
	},
	mt0: {
		"margin-top": "0rem",
	},
	mt1: {
		"margin-top": ".25rem",
	},
	mt2: {
		"margin-top": ".5rem",
	},
	mt3: {
		"margin-top": ".75rem",
	},
	mt4: {
		"margin-top": "1rem",
	},
	mt5: {
		"margin-top": "1.25rem",
	},
	mt6: {
		"margin-top": "1.5rem",
	},
	mt7: {
		"margin-top": "1.75rem",
	},
	mt8: {
		"margin-top": "2rem",
	},
	mt9: {
		"margin-top": "2.25rem",
	},
	mt10: {
		"margin-top": "2.5rem",
	},
	mt11: {
		"margin-top": "2.75rem",
	},
	mt12: {
		"margin-top": "3rem",
	},
	mt13: {
		"margin-top": "3.25rem",
	},
	mt14: {
		"margin-top": "3.5rem",
	},
	mt15: {
		"margin-top": "3.75rem",
	},
	mt16: {
		"margin-top": "4rem",
	},
	mtAuto: {
		"margin-top": "auto",
	},
	mr0: {
		"margin-right": "0rem",
	},
	mr1: {
		"margin-right": ".25rem",
	},
	mr2: {
		"margin-right": ".5rem",
	},
	mr3: {
		"margin-right": ".75rem",
	},
	mr4: {
		"margin-right": "1rem",
	},
	mr5: {
		"margin-right": "1.25rem",
	},
	mr6: {
		"margin-right": "1.5rem",
	},
	mr7: {
		"margin-right": "1.75rem",
	},
	mr8: {
		"margin-right": "2rem",
	},
	mr9: {
		"margin-right": "2.25rem",
	},
	mr10: {
		"margin-right": "2.5rem",
	},
	mr11: {
		"margin-right": "2.75rem",
	},
	mr12: {
		"margin-right": "3rem",
	},
	mr13: {
		"margin-right": "3.25rem",
	},
	mr14: {
		"margin-right": "3.5rem",
	},
	mr15: {
		"margin-right": "3.75rem",
	},
	mr16: {
		"margin-right": "4rem",
	},
	mrAuto: {
		"margin-right": "auto",
	},
	mb0: {
		"margin-bottom": "0rem",
	},
	mb1: {
		"margin-bottom": ".25rem",
	},
	mb2: {
		"margin-bottom": ".5rem",
	},
	mb3: {
		"margin-bottom": ".75rem",
	},
	mb4: {
		"margin-bottom": "1rem",
	},
	mb5: {
		"margin-bottom": "1.25rem",
	},
	mb6: {
		"margin-bottom": "1.5rem",
	},
	mb7: {
		"margin-bottom": "1.75rem",
	},
	mb8: {
		"margin-bottom": "2rem",
	},
	mb9: {
		"margin-bottom": "2.25rem",
	},
	mb10: {
		"margin-bottom": "2.5rem",
	},
	mb11: {
		"margin-bottom": "2.75rem",
	},
	mb12: {
		"margin-bottom": "3rem",
	},
	mb13: {
		"margin-bottom": "3.25rem",
	},
	mb14: {
		"margin-bottom": "3.5rem",
	},
	mb15: {
		"margin-bottom": "3.75rem",
	},
	mb16: {
		"margin-bottom": "4rem",
	},
	mbAuto: {
		"margin-bottom": "auto",
	},
	ml0: {
		"margin-left": "0rem",
	},
	ml1: {
		"margin-left": ".25rem",
	},
	ml2: {
		"margin-left": ".5rem",
	},
	ml3: {
		"margin-left": ".75rem",
	},
	ml4: {
		"margin-left": "1rem",
	},
	ml5: {
		"margin-left": "1.25rem",
	},
	ml6: {
		"margin-left": "1.5rem",
	},
	ml7: {
		"margin-left": "1.75rem",
	},
	ml8: {
		"margin-left": "2rem",
	},
	ml9: {
		"margin-left": "2.25rem",
	},
	ml10: {
		"margin-left": "2.5rem",
	},
	ml11: {
		"margin-left": "2.75rem",
	},
	ml12: {
		"margin-left": "3rem",
	},
	ml13: {
		"margin-left": "3.25rem",
	},
	ml14: {
		"margin-left": "3.5rem",
	},
	ml15: {
		"margin-left": "3.75rem",
	},
	ml16: {
		"margin-left": "4rem",
	},
	mlAuto: {
		"margin-left": "auto",
	},
	mx0: {
		"margin-left": "0rem",
		"margin-right": "0rem",
	},
	mx1: {
		"margin-left": ".25rem",
		"margin-right": ".25rem",
	},
	mx2: {
		"margin-left": ".5rem",
		"margin-right": ".5rem",
	},
	mx3: {
		"margin-left": ".75rem",
		"margin-right": ".75rem",
	},
	mx4: {
		"margin-left": "1rem",
		"margin-right": "1rem",
	},
	mx5: {
		"margin-left": "1.25rem",
		"margin-right": "1.25rem",
	},
	mx6: {
		"margin-left": "1.5rem",
		"margin-right": "1.5rem",
	},
	mx7: {
		"margin-left": "1.75rem",
		"margin-right": "1.75rem",
	},
	mx8: {
		"margin-left": "2rem",
		"margin-right": "2rem",
	},
	mx9: {
		"margin-left": "2.25rem",
		"margin-right": "2.25rem",
	},
	mx10: {
		"margin-left": "2.5rem",
		"margin-right": "2.5rem",
	},
	mx11: {
		"margin-left": "2.75rem",
		"margin-right": "2.75rem",
	},
	mx12: {
		"margin-left": "3rem",
		"margin-right": "3rem",
	},
	mx13: {
		"margin-left": "3.25rem",
		"margin-right": "3.25rem",
	},
	mx14: {
		"margin-left": "3.5rem",
		"margin-right": "3.5rem",
	},
	mx15: {
		"margin-left": "3.75rem",
		"margin-right": "3.75rem",
	},
	mx16: {
		"margin-left": "4rem",
		"margin-right": "4rem",
	},
	mxAuto: {
		"margin-left": "auto",
		"margin-right": "auto",
	},
	my0: {
		"margin-top": "0rem",
		"margin-bottom": "0rem",
	},
	my1: {
		"margin-top": ".25rem",
		"margin-bottom": ".25rem",
	},
	my2: {
		"margin-top": ".5rem",
		"margin-bottom": ".5rem",
	},
	my3: {
		"margin-top": ".75rem",
		"margin-bottom": ".75rem",
	},
	my4: {
		"margin-top": "1rem",
		"margin-bottom": "1rem",
	},
	my5: {
		"margin-top": "1.25rem",
		"margin-bottom": "1.25rem",
	},
	my6: {
		"margin-top": "1.5rem",
		"margin-bottom": "1.5rem",
	},
	my7: {
		"margin-top": "1.75rem",
		"margin-bottom": "1.75rem",
	},
	my8: {
		"margin-top": "2rem",
		"margin-bottom": "2rem",
	},
	my9: {
		"margin-top": "2.25rem",
		"margin-bottom": "2.25rem",
	},
	my10: {
		"margin-top": "2.5rem",
		"margin-bottom": "2.5rem",
	},
	my11: {
		"margin-top": "2.75rem",
		"margin-bottom": "2.75rem",
	},
	my12: {
		"margin-top": "3rem",
		"margin-bottom": "3rem",
	},
	my13: {
		"margin-top": "3.25rem",
		"margin-bottom": "3.25rem",
	},
	my14: {
		"margin-top": "3.5rem",
		"margin-bottom": "3.5rem",
	},
	my15: {
		"margin-top": "3.75rem",
		"margin-bottom": "3.75rem",
	},
	my16: {
		"margin-top": "4rem",
		"margin-bottom": "4rem",
	},
	myAuto: {
		"margin-top": "auto",
		"margin-bottom": "auto",
	},
	ma0: {
		margin: "0rem",
	},
	ma1: {
		margin: ".25rem",
	},
	ma2: {
		margin: ".5rem",
	},
	ma3: {
		margin: ".75rem",
	},
	ma4: {
		margin: "1rem",
	},
	ma5: {
		margin: "1.25rem",
	},
	ma6: {
		margin: "1.5rem",
	},
	ma7: {
		margin: "1.75rem",
	},
	ma8: {
		margin: "2rem",
	},
	ma9: {
		margin: "2.25rem",
	},
	ma10: {
		margin: "2.5rem",
	},
	ma11: {
		margin: "2.75rem",
	},
	ma12: {
		margin: "3rem",
	},
	ma13: {
		margin: "3.25rem",
	},
	ma14: {
		margin: "3.5rem",
	},
	ma15: {
		margin: "3.75rem",
	},
	ma16: {
		margin: "4rem",
	},
	maAuto: {
		margin: "auto",
	},
	pt0: {
		"padding-top": "0rem",
	},
	pt1: {
		"padding-top": ".25rem",
	},
	pt2: {
		"padding-top": ".5rem",
	},
	pt3: {
		"padding-top": ".75rem",
	},
	pt4: {
		"padding-top": "1rem",
	},
	pt5: {
		"padding-top": "1.25rem",
	},
	pt6: {
		"padding-top": "1.5rem",
	},
	pt7: {
		"padding-top": "1.75rem",
	},
	pt8: {
		"padding-top": "2rem",
	},
	pt9: {
		"padding-top": "2.25rem",
	},
	pt10: {
		"padding-top": "2.5rem",
	},
	pt11: {
		"padding-top": "2.75rem",
	},
	pt12: {
		"padding-top": "3rem",
	},
	pt13: {
		"padding-top": "3.25rem",
	},
	pt14: {
		"padding-top": "3.5rem",
	},
	pt15: {
		"padding-top": "3.75rem",
	},
	pt16: {
		"padding-top": "4rem",
	},
	ptAuto: {
		"padding-top": "auto",
	},
	pr0: {
		"padding-right": "0rem",
	},
	pr1: {
		"padding-right": ".25rem",
	},
	pr2: {
		"padding-right": ".5rem",
	},
	pr3: {
		"padding-right": ".75rem",
	},
	pr4: {
		"padding-right": "1rem",
	},
	pr5: {
		"padding-right": "1.25rem",
	},
	pr6: {
		"padding-right": "1.5rem",
	},
	pr7: {
		"padding-right": "1.75rem",
	},
	pr8: {
		"padding-right": "2rem",
	},
	pr9: {
		"padding-right": "2.25rem",
	},
	pr10: {
		"padding-right": "2.5rem",
	},
	pr11: {
		"padding-right": "2.75rem",
	},
	pr12: {
		"padding-right": "3rem",
	},
	pr13: {
		"padding-right": "3.25rem",
	},
	pr14: {
		"padding-right": "3.5rem",
	},
	pr15: {
		"padding-right": "3.75rem",
	},
	pr16: {
		"padding-right": "4rem",
	},
	prAuto: {
		"padding-right": "auto",
	},
	pb0: {
		"padding-bottom": "0rem",
	},
	pb1: {
		"padding-bottom": ".25rem",
	},
	pb2: {
		"padding-bottom": ".5rem",
	},
	pb3: {
		"padding-bottom": ".75rem",
	},
	pb4: {
		"padding-bottom": "1rem",
	},
	pb5: {
		"padding-bottom": "1.25rem",
	},
	pb6: {
		"padding-bottom": "1.5rem",
	},
	pb7: {
		"padding-bottom": "1.75rem",
	},
	pb8: {
		"padding-bottom": "2rem",
	},
	pb9: {
		"padding-bottom": "2.25rem",
	},
	pb10: {
		"padding-bottom": "2.5rem",
	},
	pb11: {
		"padding-bottom": "2.75rem",
	},
	pb12: {
		"padding-bottom": "3rem",
	},
	pb13: {
		"padding-bottom": "3.25rem",
	},
	pb14: {
		"padding-bottom": "3.5rem",
	},
	pb15: {
		"padding-bottom": "3.75rem",
	},
	pb16: {
		"padding-bottom": "4rem",
	},
	pbAuto: {
		"padding-bottom": "auto",
	},
	pl0: {
		"padding-left": "0rem",
	},
	pl1: {
		"padding-left": ".25rem",
	},
	pl2: {
		"padding-left": ".5rem",
	},
	pl3: {
		"padding-left": ".75rem",
	},
	pl4: {
		"padding-left": "1rem",
	},
	pl5: {
		"padding-left": "1.25rem",
	},
	pl6: {
		"padding-left": "1.5rem",
	},
	pl7: {
		"padding-left": "1.75rem",
	},
	pl8: {
		"padding-left": "2rem",
	},
	pl9: {
		"padding-left": "2.25rem",
	},
	pl10: {
		"padding-left": "2.5rem",
	},
	pl11: {
		"padding-left": "2.75rem",
	},
	pl12: {
		"padding-left": "3rem",
	},
	pl13: {
		"padding-left": "3.25rem",
	},
	pl14: {
		"padding-left": "3.5rem",
	},
	pl15: {
		"padding-left": "3.75rem",
	},
	pl16: {
		"padding-left": "4rem",
	},
	plAuto: {
		"padding-left": "auto",
	},
	px0: {
		"padding-left": "0rem",
		"padding-right": "0rem",
	},
	px1: {
		"padding-left": ".25rem",
		"padding-right": ".25rem",
	},
	px2: {
		"padding-left": ".5rem",
		"padding-right": ".5rem",
	},
	px3: {
		"padding-left": ".75rem",
		"padding-right": ".75rem",
	},
	px4: {
		"padding-left": "1rem",
		"padding-right": "1rem",
	},
	px5: {
		"padding-left": "1.25rem",
		"padding-right": "1.25rem",
	},
	px6: {
		"padding-left": "1.5rem",
		"padding-right": "1.5rem",
	},
	px7: {
		"padding-left": "1.75rem",
		"padding-right": "1.75rem",
	},
	px8: {
		"padding-left": "2rem",
		"padding-right": "2rem",
	},
	px9: {
		"padding-left": "2.25rem",
		"padding-right": "2.25rem",
	},
	px10: {
		"padding-left": "2.5rem",
		"padding-right": "2.5rem",
	},
	px11: {
		"padding-left": "2.75rem",
		"padding-right": "2.75rem",
	},
	px12: {
		"padding-left": "3rem",
		"padding-right": "3rem",
	},
	px13: {
		"padding-left": "3.25rem",
		"padding-right": "3.25rem",
	},
	px14: {
		"padding-left": "3.5rem",
		"padding-right": "3.5rem",
	},
	px15: {
		"padding-left": "3.75rem",
		"padding-right": "3.75rem",
	},
	px16: {
		"padding-left": "4rem",
		"padding-right": "4rem",
	},
	pxAuto: {
		"padding-left": "auto",
		"padding-right": "auto",
	},
	py0: {
		"padding-top": "0rem",
		"padding-bottom": "0rem",
	},
	py1: {
		"padding-top": ".25rem",
		"padding-bottom": ".25rem",
	},
	py2: {
		"padding-top": ".5rem",
		"padding-bottom": ".5rem",
	},
	py3: {
		"padding-top": ".75rem",
		"padding-bottom": ".75rem",
	},
	py4: {
		"padding-top": "1rem",
		"padding-bottom": "1rem",
	},
	py5: {
		"padding-top": "1.25rem",
		"padding-bottom": "1.25rem",
	},
	py6: {
		"padding-top": "1.5rem",
		"padding-bottom": "1.5rem",
	},
	py7: {
		"padding-top": "1.75rem",
		"padding-bottom": "1.75rem",
	},
	py8: {
		"padding-top": "2rem",
		"padding-bottom": "2rem",
	},
	py9: {
		"padding-top": "2.25rem",
		"padding-bottom": "2.25rem",
	},
	py10: {
		"padding-top": "2.5rem",
		"padding-bottom": "2.5rem",
	},
	py11: {
		"padding-top": "2.75rem",
		"padding-bottom": "2.75rem",
	},
	py12: {
		"padding-top": "3rem",
		"padding-bottom": "3rem",
	},
	py13: {
		"padding-top": "3.25rem",
		"padding-bottom": "3.25rem",
	},
	py14: {
		"padding-top": "3.5rem",
		"padding-bottom": "3.5rem",
	},
	py15: {
		"padding-top": "3.75rem",
		"padding-bottom": "3.75rem",
	},
	py16: {
		"padding-top": "4rem",
		"padding-bottom": "4rem",
	},
	pyAuto: {
		"padding-top": "auto",
		"padding-bottom": "auto",
	},
	pa0: {
		padding: "0rem",
	},
	pa1: {
		padding: ".25rem",
	},
	pa2: {
		padding: ".5rem",
	},
	pa3: {
		padding: ".75rem",
	},
	pa4: {
		padding: "1rem",
	},
	pa5: {
		padding: "1.25rem",
	},
	pa6: {
		padding: "1.5rem",
	},
	pa7: {
		padding: "1.75rem",
	},
	pa8: {
		padding: "2rem",
	},
	pa9: {
		padding: "2.25rem",
	},
	pa10: {
		padding: "2.5rem",
	},
	pa11: {
		padding: "2.75rem",
	},
	pa12: {
		padding: "3rem",
	},
	pa13: {
		padding: "3.25rem",
	},
	pa14: {
		padding: "3.5rem",
	},
	pa15: {
		padding: "3.75rem",
	},
	pa16: {
		padding: "4rem",
	},
	paAuto: {
		padding: "auto",
	},
	op0: {
		opacity: "0",
	},
	op025: {
		opacity: ".25",
	},
	op05: {
		opacity: ".5",
	},
	op075: {
		opacity: ".75",
	},
	op1: {
		opacity: "1",
	},
	lineThrough: {
		"text-decoration": "line-through",
	},
});

type UtilStyles = {
	[key in keyof ReturnType<typeof createUtilSSInput>]: string;
};
export const utilStyles = ReactStyleSheet.create(
	createUtilSSInput()
) as UtilStyles;
