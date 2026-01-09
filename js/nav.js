// Wait for DOM to be fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
    // ---HAMBURGER MENU TOGGLE---//
    
    // Get references to hamburger button and navigation list
    const hamburger = document.querySelector(".hamburger-menu");
    const navList = document.getElementById("nav-list"); // ✅ FIXED: Changed from "main-nav" to "navList"

    // Check if both elements exist in the DOM
    if (hamburger && navList) {
        // Toggle mobile menu when hamburger is clicked
        hamburger.addEventListener("click", () => {
            // Add or remove 'active' class to show/hide menu
            navList.classList.toggle("active"); // ✅ FIXED: Toggle on #navList, not #main-nav
            
            // Log current menu state to console
            console.log(
                "[Nav] Menu toggled:",
                navList.classList.contains("active")
            );
        });

        // Close the menu when a link is clicked
        
        // Get all navigation links
        const navItems = navList.querySelectorAll("a");
        
        // Add click listener to each navigation link
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                // Check if menu is currently open
                if (navList.classList.contains("active")) {
                    // Close the menu by removing 'active' class
                    navList.classList.remove("active");
                    
                    // Log menu closure
                    console.log("[Nav] Menu closed after link click");
                }
            });
        });

        // Log successful navigation initialization
        console.log("[Nav] ✓ Navigation initialized");
    } else {
        // Log error if elements are not found
        console.error("[Nav] ✗ Hamburger or navList not found!");
        console.log("[Nav] Hamburger:", hamburger);
        console.log("[Nav] NavList:", navList);
    }
});
