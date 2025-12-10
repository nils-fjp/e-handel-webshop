document.addEventListener("DOMContentLoaded", () => {
    // ---HAMBURGER MENU TOGGLE---//
    const hamburger = document.querySelector(".hamburger-menu");
    const navLinks = document.getElementById("main-nav");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active"); // Open/close the nav menu
        });

        // Optionally close the menu when a link is clicked (for single-page applications)
        const navItems = navLinks.querySelectorAll("a");
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            });
        });
    }
});
