# Countries Flags Explorer

A simple TypeScript web app to explore countries and their flags. Search, filter by region, view country details, and toggle dark mode.

## Features

- Browse all countries and their flags
- Search countries by name
- Filter by region (Africa, America, Asia, Europe, Oceania, Antarctic)
- View detailed info: population, region, capital, currencies, languages, borders, and more
- Navigate to border countries
- Light/Dark mode toggle

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/countries-flags-explorer.git
   cd countries-flags-explorer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Build the project:**
   ```sh
   npm run build
   ```

4. **Open `index.html` via live server in your browser.**

## Project Structure

```
index.html
tsconfig.json
css/
  style.css
fonts/
  Nunito_Sans/
img/
  favicon.ico
src/
  darkMode.ts
  filtering.ts
  main.ts
  renderCountries.ts
```

## API

Uses the [REST Countries API](https://restcountries.com/) for country data.

---

**Author:** MilosShindiri
