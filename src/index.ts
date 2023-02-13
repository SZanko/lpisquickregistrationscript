import { LvaOptions, LvaType } from "./lvaoptions";
import { PageState } from "./pagestate";

enum Language {
	de = 'german',
	en = 'english'
}




const coursenumber: number = 4653;
const clickdelayinms: number = 500;
const registrationpossiblethroughentryofNumbers: boolean = false;
const lvaToRegister = new LvaOptions(
	coursenumber,
	registrationpossiblethroughentryofNumbers,
	"SBWL Kurs V - Entrepreneurship & Innovation",
	LvaType.pi
)


function getCurrentLanguage(): Language {
	const notcurrentlanguage: string = document.querySelector('#slang button').title
	switch (notcurrentlanguage) {
		case 'german':
			return Language.en;
		case 'english':
		default:
			return Language.de;
	}
}

function getState(): PageState {
	const tmp = document.querySelectorAll('.thd')[1].textContent;
	switch (tmp) {
		case 'Nummerneingabe':
		case 'entry of numbers':
			return PageState.searchpage;
		case 'degree program structure':
		case 'Studienplan':
			return PageState.generalcourse;
		default:
			return PageState.loginpage;
	}
}

function isRegistrationPossible(): boolean {
	const containsredElements: HTMLElement = document.querySelector("[style*='color: red']");
	const containsgreenElements: HTMLElement = document.querySelector("[style*='color: green']");

	if (containsgreenElements != null) {
		return true;
	}
	else {
		return false;
	}
}

function getRowFromTable(table:HTMLTableElement, coursename:string){
	rows: [HTMLTableRowElement]
}


let state: PageState = getState();

console.log("Start")

if (state === PageState.generalcourse) {
	if(lvaToRegister.registrationpossiblethroughentryofNumbers){
		setTimeout(() => {
			const coursesearch = document.querySelectorAll('a')[6];
			coursesearch.click();
		}, clickdelayinms);
		state = PageState.searchpage;
	}
	else {
		
	}
}

if (state === PageState.searchpage) {
	setTimeout(() => {
		const searchfield = document.querySelector('input[type=text]').value = lvaToRegister.coursenumber;
		const searchbutton: HTMLButtonElement = document.querySelector('#ea_verid').querySelector('input[type=submit]');
		searchbutton.click();
	}, clickdelayinms);

	if (isRegistrationPossible) {
		setTimeout(() => {
			const registrationbutton: HTMLButtonElement = document.querySelectorAll('input[type=submit]')[1];
			registrationbutton.click();
		}, clickdelayinms);
	}
}
