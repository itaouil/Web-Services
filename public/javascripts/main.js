// Run JS when page loaded
$(function() {

    // Variables
    const cities = [];

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    // Endpoint referencing our cities and states data
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    // Fetch data
    // and use the spread operator
    // to deconstruct the data fetched
    fetch(endpoint)
        .then(response => response.json())
        .then(data => cities.push(...data));

    // Number with commas regexp
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Find matching data
    function findMatches(wordToMatch, cities) {
        const regex = new RegExp(wordToMatch, 'gi');
        return cities.filter(place => {
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    // Render data
    function renderData() {
        const matches = findMatches(this.value, cities);
        const html = matches.map(match => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = match.city.replace(regex, `<span class='hl'>${this.value}</span>`);
        const stateName = match.state.replace(regex, `<span class='hl'>${this.value}</span>`);
        const population = numberWithCommas(match.population);
        return `
            <li>
            <span>${cityName}, ${stateName}</span>
            <span>${population}</span>
            </li>
        `;
        }).join('');

        suggestions.innerHTML = html;
    }

    // Input event listening
    searchInput.addEventListener('keyup', renderData);

});