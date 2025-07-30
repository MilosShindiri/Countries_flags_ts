export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: Record<string, {
            
            official: string;
            common: string;
            
        }>;

    };
    flags: {
        png: string;
    };
    population: string;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, {
        name: string;
    }>;
    languages?: Record<string, string>;
    borders?: string[];
    cca3: string;
    
}

// name, flags, population, region, subregion, capital, tld, currencies, languages, borders, cca3

let body = document.body;
let container = document.getElementById('countries_container') as HTMLElement;


let modal = document.getElementById('modal') as HTMLElement;
let modalBody = document.getElementById('modalBody') as HTMLElement;
let closeModal = document.getElementById('closeModal') as HTMLElement;

let countryCodeMap: Record<string, { official: string; common: string }> = {};

const requestURL = 'https://restcountries.com/v3.1/all?fullText=true&fields=name,flags,population,region,subregion,capital,currencies,languages,tld,cca3';
const requestByName = 'https://restcountries.com/v3.1/name/';

export let allCountriesData: Country[] = [];

// API
export function AllCountries(): void {
    fetch(requestURL)
        .then(response => response.json())
        .then((data: Country[]) => {
            allCountriesData = data;
            console.log(data, 'res')
            data.forEach(country => {
                if (country.cca3) {
                    countryCodeMap[country.cca3] = {
                        official: country.name.official,
                        common: country.name.common
                    };
                }
            });

            renderCountries(data);

        });
}
AllCountries();


export function renderCountries(data: Country[]): void {

    container.innerHTML = '';
    data.forEach(country => {

        const div = document.createElement('div');
        const div2 = document.createElement('div2');
        const image = document.createElement('img');
        const name = document.createElement('h2');
        const population = document.createElement('p');
        const region = document.createElement('p');
        const capital = document.createElement('p');

        div.classList = 'card';
        image.classList = 'flags-img';
        image.src = country?.flags?.png;
        div2.classList = 'info';

        name.innerText = country?.name?.common;
        population.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
        region.innerHTML = `<b>Region:</b> ${country.region}`;
        capital.innerHTML = `<b>Capital:</b> ${(country.capital || []).join(', ')}`;

        div.appendChild(image);
        div2.appendChild(name);
        div2.appendChild(population);
        div2.appendChild(region);
        div2.appendChild(capital);

        div.appendChild(div2);
        container.appendChild(div);

        div.addEventListener('click', () => {
            showCountryModal(country?.name?.official);
        });
    });
}

async function getCountryInfoByName(countryName: string): Promise<Country[]> {
    const res = await fetch(requestByName + encodeURIComponent(countryName));
    return res.json();
}

async function showCountryModal(countryName: string): Promise<void>  {
    const res = await getCountryInfoByName(countryName);
    
    // CHINA
    const country = res.find(item => item.name.official === countryName );
        if (!country) return;
    modal.style.display = 'flex';
    body.style.overflow = 'hidden';

    modalBody.innerHTML = `



        <img class="modalFlag" src="${country?.flags?.png}" />

        
        <div class="modal-info-container">

                <h2>${country.name.common}</h2>
                <div class="details-columns">
                    <p><b>Native Name: </b>${Object.values(country.name.nativeName || {})[0]?.common || ''}</p>
                    <p><b>Population: </b>${country.population.toLocaleString()}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Subregion: </b>${country.subregion || ''}</p>
                    <p><b>Capital: </b>${(country.capital || []).join(', ')}</p>



                    <p><b>Top Level Domain: </b>${(country.tld || []).join(', ')}</p>
                    <p><b>Currency: </b>${Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
                    <p><b>Language: </b>${Object.values(country.languages || {}).join(', ')}</p>
                </div>
                


            <div class="borders">
            ${country.borders ? `<p><b>Border Countries: </b>
                ${country.borders.map(code => `<button class="border-btn" data-country="${countryCodeMap[code]?.official || code}">${countryCodeMap[code]?.common || code}</button>`).join(' ')}</p>` : ''}
            </div>
        
        </div>


        

    `;

    setupBorderButtons();
}

function setupBorderButtons() {
    const borderButtons = document.querySelectorAll('.border-btn');
    borderButtons.forEach(button => {
        const btn = button as HTMLButtonElement;
        const countryName = btn.dataset.country;
        if(countryName) {
            btn.addEventListener('click', () => {
                showCountryModal(countryName);
            });
        }
    });
}

// CLOSE MODAL
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
});