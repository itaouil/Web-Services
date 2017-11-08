// Run JS when page loaded
$(function() {

    // Storing cities
    const cities = [];

    // DOM elememnts used for data injection
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    // Endpoint used to retrieve list of cities (world)
    const endpoint = 'http://localhost:3000/api/cities';
    
    // Fetch data
    // and use the spread operator
    // to deconstruct the data fetched
    fetch(endpoint)
        .then(response => response.json())
        .then(data => cities.push(...data));

    // Find matching cities
    function findMatches(cityToMatch, cities) {
        const regex = new RegExp(cityToMatch, 'gi');
        return cities.filter(city => {
            return city.city.match(regex)
        });
    }

    // Render data
    function renderData() {

        const matches = findMatches(this.value, cities).slice(1,10);
        const html = matches.map(match => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = match.city.replace(regex, `<span class='hl'>${this.value}</span>`);
            // const stateName = match.state.recity(regex, `<span class='hl'>${this.value}</span>`);
            // const population = numberWithCommas(match.population);
            return `
                <li>
                    <span>${cityName}</span>
                </li>
            `;
        }).join('');

        suggestions.innerHTML = html;

    }

    // Input event listening
    searchInput.addEventListener('keyup', renderData);

});