document.addEventListener("DOMContentLoaded", () => {
    // ---HAMBURGER MENU TOGGLE---//
    const hamburger = document.querySelector(".hamburger-menu");
    const navList = document.getElementById("navList");  // ✅ FIXED: Changed from "main-nav" to "navList"

    if (hamburger && navList) {
        hamburger.addEventListener("click", () => {
            navList.classList.toggle("active");  // ✅ FIXED: Toggle on #navList, not #main-nav
            console.log('[Nav] Menu toggled:', navList.classList.contains('active'));
        });

        // Close the menu when a link is clicked
        const navItems = navList.querySelectorAll("a");
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                if (navList.classList.contains("active")) {
                    navList.classList.remove("active");
                    console.log('[Nav] Menu closed after link click');
                }
            });
        });
        
        console.log('[Nav] ✓ Navigation initialized');
    } else {
        console.error('[Nav] ✗ Hamburger or navList not found!');
        console.log('[Nav] Hamburger:', hamburger);
        console.log('[Nav] NavList:', navList);
    }
});