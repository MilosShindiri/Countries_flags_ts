var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// name, flags, population, region, subregion, capital, tld, currencies, languages, borders, cca3
let body = document.body;
let container = document.getElementById("countries_container");
let modal = document.getElementById("modal");
let modalBody = document.getElementById("modalBody");
let closeModal = document.getElementById("closeModal");
let countryCodeMap = {};
const requestURL = "https://restcountries.com/v3.1/all?fullText=true&fields=name,flags,population,region,subregion,capital,currencies,languages,tld,cca3";
const requestByName = "https://restcountries.com/v3.1/name/";
export let allCountriesData = [];
// API
export function AllCountries() {
    fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
        allCountriesData = data;
        data.forEach((country) => {
            if (country.cca3) {
                countryCodeMap[country.cca3] = {
                    official: country.name.official,
                    common: country.name.common,
                };
            }
        });
        renderCountries(data);
    });
}
AllCountries();
export function renderCountries(data) {
    container.innerHTML = "";
    data.forEach((country) => {
        var _a, _b;
        const div = document.createElement("div");
        const div2 = document.createElement("div2");
        const image = document.createElement("img");
        const name = document.createElement("h2");
        const population = document.createElement("p");
        const region = document.createElement("p");
        const capital = document.createElement("p");
        div.classList = "card";
        image.classList = "flags-img";
        image.src = (_a = country === null || country === void 0 ? void 0 : country.flags) === null || _a === void 0 ? void 0 : _a.png;
        div2.classList = "info";
        name.innerText = (_b = country === null || country === void 0 ? void 0 : country.name) === null || _b === void 0 ? void 0 : _b.common;
        population.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
        region.innerHTML = `<b>Region:</b> ${country.region}`;
        capital.innerHTML = `<b>Capital:</b> ${(country.capital || []).join(", ")}`;
        div.appendChild(image);
        div2.appendChild(name);
        div2.appendChild(population);
        div2.appendChild(region);
        div2.appendChild(capital);
        div.appendChild(div2);
        container.appendChild(div);
        div.addEventListener("click", () => {
            var _a;
            showCountryModal((_a = country === null || country === void 0 ? void 0 : country.name) === null || _a === void 0 ? void 0 : _a.official);
        });
    });
}
function getCountryInfoByName(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(requestByName + encodeURIComponent(countryName));
        return res.json();
    });
}
function showCountryModal(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const res = yield getCountryInfoByName(countryName);
        // CHINA
        const country = res.find((item) => item.name.official === countryName);
        if (!country)
            return;
        modal.style.display = "flex";
        body.style.overflow = "hidden";
        modalBody.innerHTML = `



        <img class="modalFlag" src="${(_a = country === null || country === void 0 ? void 0 : country.flags) === null || _a === void 0 ? void 0 : _a.png}" />

        
        <div class="modal-info-container">

                <h2>${country.name.common}</h2>
                <div class="details-columns">
                    <p><b>Native Name: </b>${((_b = Object.values(country.name.nativeName || {})[0]) === null || _b === void 0 ? void 0 : _b.common) ||
            ""}</p>
                    <p><b>Population: </b>${country.population.toLocaleString()}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Subregion: </b>${country.subregion || ""}</p>
                    <p><b>Capital: </b>${(country.capital || []).join(", ")}</p>



                    <p><b>Top Level Domain: </b>${(country.tld || []).join(", ")}</p>
                    <p><b>Currency: </b>${Object.values(country.currencies || {})
            .map((c) => c.name)
            .join(", ")}</p>
                    <p><b>Language: </b>${Object.values(country.languages || {}).join(", ")}</p>
                </div>
                


            <div class="borders">
            ${country.borders
            ? `<p><b>Border Countries: </b>
                ${country.borders
                .map((code) => {
                var _a, _b;
                return `<button class="border-btn" data-country="${((_a = countryCodeMap[code]) === null || _a === void 0 ? void 0 : _a.official) || code}">${((_b = countryCodeMap[code]) === null || _b === void 0 ? void 0 : _b.common) || code}</button>`;
            })
                .join(" ")}</p>`
            : ""}
            </div>
        
        </div>


        

    `;
        setupBorderButtons();
    });
}
function setupBorderButtons() {
    const borderButtons = document.querySelectorAll(".border-btn");
    borderButtons.forEach((button) => {
        const btn = button;
        const countryName = btn.dataset.country;
        if (countryName) {
            btn.addEventListener("click", () => {
                showCountryModal(countryName);
            });
        }
    });
}
// CLOSE MODAL
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    body.style.overflow = "auto";
});
//# sourceMappingURL=renderCountries.js.map