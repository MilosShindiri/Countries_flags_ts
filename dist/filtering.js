"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = applyFilters;
const renderCountries_js_1 = require("./renderCountries.js");
let searchInput = document.getElementById('input');
let filtering = document.getElementById('region_filter');
// DEBOUNCING
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
// SEARCH + FILTER
function applyFilters() {
    let query = searchInput.value.trim().toLowerCase();
    let region = filtering.value.trim().toLowerCase();
    let filtered = renderCountries_js_1.allCountriesData.filter(country => {
        let nameMatch = country.name.common.toLowerCase().includes(query);
        let regionMatch = country.region.toLowerCase().includes(region);
        return nameMatch && regionMatch;
    });
    (0, renderCountries_js_1.renderCountries)(filtered);
}
filtering.addEventListener('change', applyFilters);
searchInput.addEventListener('input', debounce(applyFilters, 500));
//# sourceMappingURL=filtering.js.map