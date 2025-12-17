const toggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
}

toggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    localStorage.setItem(
        "theme",
        body.classList.contains("light-mode") ? "light" : "dark"
    );
});
