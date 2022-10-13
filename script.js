'use strict';

const file = './bundesländer.json';
let statesArr = [];
let firstCharactersArr = [];


async function init() {
    await loadStates(file);
    renderStates(statesArr);
    getCharacters(statesArr);
    renderCharacters(firstCharactersArr);
}


async function loadStates(file) {
    statesArr = await fetch(file).then(response => response.json());
}


function renderStates(states) {
    const statesContainer = document.getElementById('states-container');

    statesContainer.innerHTML = '';
    states.forEach(state => {
        statesContainer.innerHTML += stateTemp(state);
    })
}


function getCharacters(states) {
    states.forEach(state => {
        const firstCharacter = state.name.charAt(0).toUpperCase();
        
        if (!firstCharactersArr.includes(firstCharacter)) {
            firstCharactersArr.push(firstCharacter);
        }
    })
}


function renderCharacters(characters) {
    const charactersContainer = document.getElementById('characters-container');

    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        charactersContainer.innerHTML += characterTemp(character);
    })
}


function stateTemp(state) {
    return `
        <a href="${state.url}" target="_blank">
            <div>
                <h4>${state.name}</h4>
                <span>${String(state.population).replace('.', ',')} Millionen</span>
            </div>
        </a>`;
}


function characterTemp(character) {
    return `
        <li onclick="filterStates('${character}')">${character}</li>`;
}


function filterStates(character) {
    const filteredStates = statesArr.filter(state => {
        return state.name.charAt(0).toUpperCase() === character;
    })

    renderStates(filteredStates);
}


init();