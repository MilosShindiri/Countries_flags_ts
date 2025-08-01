import { allCountriesData, renderCountries } from "./renderCountries.js";

let searchInput = document.getElementById("input") as HTMLSelectElement;
let filtering = document.getElementById("region_filter") as HTMLSelectElement;

// DEBOUNCING
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// SEARCH + FILTER
export function applyFilters() {
  let query = searchInput?.value.trim().toLowerCase();
  let region = filtering?.value.trim().toLowerCase();

  let filtered = allCountriesData.filter((country) => {
    let nameMatch = country.name.common.toLowerCase().includes(query);
    let regionMatch = country.region.toLowerCase().includes(region);

    return nameMatch && regionMatch;
  });

  renderCountries(filtered);
}

filtering.addEventListener("change", applyFilters);
searchInput.addEventListener("input", debounce(applyFilters, 500));
