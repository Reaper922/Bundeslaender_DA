'use strict';

const file = './bundeslaender.json';
let statesArr = [];
let firstCharactersArr = [];


/**
 * Function that runs after the page is fully loaded.
 */
async function init() {
    try {
        await loadStates(file);
        renderStates(statesArr);
        getCharacters(statesArr);
        renderCharacters(firstCharactersArr);
    } catch (error) {
        console.error(error);
        renderErrorMessage();
    }
}


/**
 * Loads the states from the given JSON file.
 * @param {String} file JSON file to load
 */
async function loadStates(file) {
    statesArr = await fetch(file).then(response => response.json());
}


/**
 * Renders the states from the given states array into the states container.
 * @param {Array} states States array
 */
function renderStates(states) {
    const statesContainer = document.getElementById('states-container');

    statesContainer.innerHTML = '';
    states.forEach(state => {
        statesContainer.innerHTML += stateTemp(state);
    })
}


/**
 * Gets the characters from the given states array.
 * @param {Array} states States array
 */
function getCharacters(states) {
    states.forEach(state => {
        const firstCharacter = state.name.charAt(0).toUpperCase();
        
        if (!firstCharactersArr.includes(firstCharacter)) {
            firstCharactersArr.push(firstCharacter);
        }
    })
}


/**
 * Renders the characters from the given array into the characets container.
 * @param {Array} characters Characters array
 */
function renderCharacters(characters) {
    const charactersContainer = document.getElementById('characters-container');

    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        charactersContainer.innerHTML += characterTemp(character);
    })
}


/**
 * Filters the statesArr array with the given character and renders the result to the states container.
 * @param {String} character Character string
 */
function filterStates(character) {
    const filteredStates = statesArr.filter(state => {
        return state.name.charAt(0).toUpperCase() === character;
    })
    
    renderStates(filteredStates);
}


/**
 * Creates the HTML template for a state.
 * @param {Object} state State object
 * @returns HTML state template
 */
function stateTemp(state) {
    return `
        <a href="${state.url}" target="_blank">
            <div>
                <h4>${state.name}</h4>
                <span>${String(state.population).replace('.', ',')} Millionen</span>
            </div>
        </a>`;
}


/**
 * Creates the HTML template for the character filter.
 * @param {String} character Character
 * @returns HTML character filter template
 */
function characterTemp(character) {
    return `
        <li onclick="filterStates('${character}')">${character}</li>`;
}


/**
 * In case of an error, this error message is rendered.
 */
function renderErrorMessage() {
    const statesContainer = document.getElementById('states-container');
    
    statesContainer.style = 'grid-template-columns: 1fr;';
    statesContainer.innerHTML = '<h4>Beim laden der Seite ist ein Fehler aufgetreten. Versuchen Sie es später erneut.</h4>';
}



init();
