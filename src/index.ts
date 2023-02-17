import { LvaOptions, LvaType } from './lvaoptions';
import { PageState } from './pagestate';

enum Language {
  de = 'german',
  en = 'english',
}

const coursenumber = 4653;
const clickdelayinms = 500;
const registrationpossiblethroughentryofNumbers = false;
const lvaToRegister: LvaOptions = new LvaOptions(
  coursenumber,
  registrationpossiblethroughentryofNumbers,
  'SBWL Kurs V - Entrepreneurship & Innovation',
  'E&I Project 6: Garage',
  //"Design von Informationssystemen",
  //"Algorithmisches Denken und Programmierung",
  LvaType.pi
);

function getCurrentLanguage(): Language {
  const notcurrentlanguage: string =
    document.querySelector('#slang button').title;
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
      const currenturl = window.location.href;
      if (currenturl.match('SPP') === null) {
        return PageState.generalcourse;
      } else {
        return PageState.grouppage;
      }
    default:
      return PageState.loginpage;
  }
}

function isRegistrationPossible(): boolean {
  const containsredElements: HTMLElement = document.querySelector(
    "[style*='color: red']"
  );
  const containsgreenElements: HTMLElement = document.querySelector(
    "[style*='color: green']"
  );

  if (containsgreenElements != null) {
    return true;
  } else {
    return false;
  }
}

function getRowFromTableWhereRegistrationPossible(
  table: HTMLTableElement
): Array {
  const coursewhereregistrationispossible = [];
  const registrationword = 'anmelden';
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const hasaregistrationoption = row.innerText.match(registrationword);
    if (hasaregistrationoption !== null) {
      coursewhereregistrationispossible.push(row);
    }
  }
  return coursewhereregistrationispossible;
}

//TODO getElement from list
function getElementWhereRegistrationPossiblefromGeneral(
  table: HTMLTableElement,
  coursename: string
) {}

//TODO support multiple groups with the same groupname but different Instructors
function getElementWhereRegistrationPossiblefromGroup(
  table: HTMLTableElement,
  groupname: string
): HTMLButtonElement {
  const registrationbutton = null;
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const group: string = row
      .querySelector('.ver_title')
      .querySelector('span').innerText;
    if (group === groupname) {
      const regbutton: HTMLButtonElement = row
        .querySelector('.action')
        .querySelector('form input[type=submit]');
      if (regbutton.value === 'anmelden') {
        return regbutton;
      }
    }
  }
  return registrationbutton;
}

let state: PageState = getState();

console.log('Start');
console.log(state);

if (state === PageState.grouppage) {
  const grouptable: HTMLTableElement = document.querySelector('.b3k-data');
  setTimeout(() => {
    const regButton = getElementWhereRegistrationPossiblefromGroup(
      grouptable,
      lvaToRegister.groupname
    );
    if (regButton !== null) {
      regButton.click();
    } else {
      console.log("Couldn't find button with coursename to register");
    }
    window.location.reload();
  }, clickdelayinms);
  state = PageState.grouppage;
}

if (state === PageState.generalcourse) {
  if (lvaToRegister.registrationpossiblethroughentryofNumbers) {
    setTimeout(() => {
      const coursesearch = document.querySelectorAll('a')[6];
      coursesearch.click();
    }, clickdelayinms);
    state = PageState.searchpage;
  } else {
    setTimeout(() => {
      const course: HTMLTableElement = document.querySelector('.b3k-data');
      const group: HTMLButtonElement = getElementWhereRegistrationPossible(
        course,
        lvaToRegister.lvaname
      );
      group.click();
    }, clickdelayinms);
    state = PageState.grouppage;
  }
}

if (state === PageState.searchpage) {
  setTimeout(() => {
    const searchfield = (document.querySelector('input[type=text]').value =
      lvaToRegister.coursenumber);
    const searchbutton: HTMLButtonElement = document
      .querySelector('#ea_verid')
      .querySelector('input[type=submit]');
    searchbutton.click();
  }, clickdelayinms);

  if (isRegistrationPossible) {
    setTimeout(() => {
      const registrationbutton: HTMLButtonElement =
        document.querySelectorAll('input[type=submit]')[1];
      registrationbutton.click();
    }, clickdelayinms);
  }
}
