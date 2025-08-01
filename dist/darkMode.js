export function initDarkMode() {
    let darkMode = document.getElementById("darkModeBtn");
    let body = document.body;
    darkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        let isDark = body.classList.contains("dark-mode");
        darkMode.innerHTML = `<span class="material-symbols-outlined">bedtime</span>${isDark ? "Light Mode" : "Dark Mode"}`;
    });
}
//# sourceMappingURL=darkMode.js.map