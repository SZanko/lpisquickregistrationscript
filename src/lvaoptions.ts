export class LvaOptions {
	constructor(
		public coursenumber: number,
		public registrationpossiblethroughentryofNumbers: boolean,
		public lvaname: string,
		public lvatype: LvaType
	) {

	}
}

export enum LvaType {
	vue = 'vue',
	pi = 'pi',
	lvp = 'lvp',
	pilvp = 'pilvp'
} 
