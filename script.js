const typingText = document.getElementById("typing-text");

const words = [
    "Frontend Developer",
    "Backend Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;


// ==============================
// TYPING EFFECT
// ==============================

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        isDeleting ? 70 : 120
    );
}


// ==============================
// PORTFOLIO TABS
// ==============================

function showPortfolio(type, button) {

    // Hide all portfolio contents
    document.querySelectorAll(".portfolio-content")
        .forEach(content => {
            content.classList.remove("active");
        });

    // Remove active button
    document.querySelectorAll(".portfolio-tab")
        .forEach(tab => {
            tab.classList.remove("active");
        });


    // Show selected content
    if (type === "projects") {

        document
            .getElementById("projects-content")
            .classList.add("active");
    }


    if (type === "certificates") {

        document
            .getElementById("certificates-content")
            .classList.add("active");
    }


    // Make clicked button active
    button.classList.add("active");
}


// ==============================
// PROJECT VIEW DEMO MODAL
// ==============================

let currentProjectImages = [];
let currentImageIndex = 0;

function openProject(title, images, description, technologies) {

    const modal = document.getElementById("projectModal");

    const modalTitle =
        document.getElementById("modalProjectTitle");

    const modalImage =
        document.getElementById("modalProjectImage");

    const modalDescription =
        document.getElementById("modalProjectDescription");

    const modalTech =
        document.getElementById("modalProjectTech");

    const imageNumber =
        document.getElementById("imageNumber");

    const imageTotal =
        document.getElementById("imageTotal");


    /* SAVE PROJECT IMAGES */

    currentProjectImages = images;
    currentImageIndex = 0;

    updateProjectImage();

    /* PROJECT INFORMATION */

    modalTitle.textContent = title;

    modalDescription.textContent = description;

    modalTech.textContent = technologies;


    /* FIRST IMAGE */

    modalImage.src =
        currentProjectImages[currentImageIndex];

    modalImage.alt = title;


    /* COUNTER */

    imageNumber.textContent =
        currentImageIndex + 1;

    imageTotal.textContent =
        currentProjectImages.length;


    /* MOVE MODAL TO BODY */

    document.body.appendChild(modal);


    /* FORCE MODAL SIZE */

    modal.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(0,0,0,0.75) !important;
        z-index: 2147483647 !important;
        padding: 20px !important;
        box-sizing: border-box !important;
    `;


    const box =
        modal.querySelector(".project-modal-box");


    box.style.cssText = `
        position: relative !important;
        width: 700px !important;
        max-width: 80vw !important;
        max-height: 80vh !important;
        overflow-y: auto !important;
        background: white !important;
        padding: 25px !important;
        border-radius: 20px !important;
        box-sizing: border-box !important;
        transform: none !important;
        zoom: 1 !important;
    `;


    document.body.classList.add("modal-open");
}

/* OPEN PROJECT MODAL */

function openProject(title, images, description, technologies) {
    const modal = document.getElementById("projectModal");

    if (!modal || !images || images.length === 0) return;

    // Set project information
    

    // IMPORTANT: laging bumalik sa first image
    currentProjectImages = images;
    currentImageIndex = 0;

    // Ilipat ang modal sa body para hindi maapektuhan ng book layout
    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    // I-display muna ang modal
    modal.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(0, 0, 0, 0.75) !important;
        z-index: 2147483647 !important;
        padding: 20px !important;
        box-sizing: border-box !important;
    `;

    const box = modal.querySelector(".project-modal-box");

    if (box) {
        box.style.cssText = `
            position: relative !important;
            width: 700px !important;
            max-width: 80vw !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
            background: white !important;
            padding: 25px !important;
            border-radius: 20px !important;
            box-sizing: border-box !important;
            transform: none !important;
            zoom: 1 !important;
        `;
    }

    // Ipakita agad ang FIRST screenshot
    updateProjectImage();

    document.body.classList.add("modal-open");
}

/* NEXT IMAGE */

function nextProjectImage() {
    if (!currentProjectImages.length) return;

    currentImageIndex =
        (currentImageIndex + 1) % currentProjectImages.length;

    updateProjectImage();
}

/* PREVIOUS IMAGE */

function previousProjectImage() {
    if (!currentProjectImages.length) return;

    currentImageIndex =
        (currentImageIndex - 1 + currentProjectImages.length)
        % currentProjectImages.length;

    updateProjectImage();
}


/* UPDATE IMAGE */

function updateProjectImage() {
    const currentImage = currentProjectImages[currentImageIndex];

    if (!currentImage) return;

    const modalImage = document.getElementById("modalProjectImage");

    // I-update agad ang title at description ng screenshot
    document.getElementById("imageTitle").textContent =
        currentImage.title;

    document.getElementById("imageDescription").textContent =
        currentImage.description;

    document.getElementById("imageNumber").textContent =
        currentImageIndex + 1;

    document.getElementById("imageTotal").textContent =
        currentProjectImages.length;

    // I-load ang tamang screenshot
    modalImage.src = currentImage.image;
    modalImage.alt = currentImage.title;
}


/* CLOSE */

function closeProject() {

    const modal =
        document.getElementById("projectModal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.classList.remove("modal-open");
}


// ==============================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE THE PROJECT BOX
// ==============================

document.addEventListener("click", function(event) {

    const modal =
        document.getElementById("projectModal");

    if (!modal) return;

    if (event.target === modal) {
        closeProject();
    }

});


// ==============================
// CLOSE MODAL USING ESC KEY
// ==============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        const modal =
            document.getElementById("projectModal");

        if (modal && modal.classList.contains("show")) {
            closeProject();
        }
    }

});


const hrisImages = [
    {
        image: "images/HRIS_3.png",
        title: "Login Page",
        description: "Email Verification Login sends a verification code to the employee’s registered Gmail upon login. Ensures secure access by confirming the employee’s identity.Uses time-limited codes to prevent unauthorized logins."
    },
    {
        image: "images/HRIS_2.png",
        title: "Reset Password",
        description: "To reset your password, simply enter your registered email address, and you will receive a verification code. Once verified, you can proceed to the final step of setting your new password."
    },
    {
        image: "images/HRIS_1.png",
        title: "Dashboard For Employee",
        description: "The sidebar provides quick access to different HRIS modules through icons including Home, Employee Profile, Attendance, DTR, Payslip, and PDS. Greetings display a personalized message with the employee's full name and EmployeeNumber, alongside the current date and time. The announcement section displays HR updates, events, and notices to keep employees informed. The payslip section shows a payroll summary for the pay periods, providing quick visibility of salary earnings. The leave section displays the total leave balance available to the employee, featuring a dropdown to filter leave by types such as Sick Leave and Vacation Leave. The calendar highlights holidays every year. Additional utilities include a page refresher, notifications, and a personal profile menu containing Profile, Settings, FAQs, Privacy Policy, and Sign Out. Furthermore, the user panel displays quick access links for DTR, PDS, Payslip, Leave Request, and Attendance History"
    },
    {
        image: "images/HRIS_4.png",
        title: "Facial Recognition",
        description: "The Facial and Fingerprint Recognition Attendance system provides a secure and reliable way to track attendance through facial recognition and fingerprint scanning. It accommodates various time-tracking options, including Time In, Break In, Break Out, Time Out, Overtime In, and Overtime Out. Furthermore, all recorded attendance data is automatically displayed within the application for seamless monitoring and verification."
    },
    {
        image: "images/HRIS_5.png",
        title: "Admin Interface",
        description: "The admin dashboard opens with a personalized greeting, the current date and time, a page refresher, live notifications, and a profile menu that houses settings, FAQs, a privacy policy, and the sign-out option. Key metrics are prominently displayed through stats covering total employees, today’s attendance, payroll processing status, payroll processed, payslips released, and upcoming leave features. Additionally, the interface features an announcement carousel, an interactive calendar with holidays, a comprehensive admin panel (managing users, payroll, leaves, DTRs, announcements, and holidays), task tracking, an overview section, analytics, and a general/admin management sidebar."
    },
    {
        image: "images/HRIS_6.png",
        title: "Daily Time Record",
        description: "The Daily Time Record (DTR) feature is an automated filtering and viewing system that allows HR staff and employees to easily generate and view attendance records. By entering an Employee Number and selecting a specific Start Date and End Date, the system quickly filters and displays the required logs. It also features interactive quick-select month buttons for faster, hassle-free monthly record retrieval."
    },
    {
        image: "images/HRIS_7.png",
        title: "Attendance Records",
        description: "The Attendance Records module provides a categorized tracking system tailored to distinct employment classifications: Non-Teaching, 30hrs / Job Order, and Designated personnel. Users can filter records by entering an Employee Number alongside custom Start and End Date ranges, or utilize quick-select monthly shortcut buttons for rapid query generation."
    },
    {
        image: "images/HRIS_8.png",
        title: "Attendance Records",
        description: "Upon clicking search, the system generates a comprehensive, real-time data table showing the employee's detailed logs. It automatically maps out actual timestamps against scheduled shifts, tracking metrics such as actual and official Time IN/Breaktime IN, rendered hours, and computed tardiness. The view dynamically calculates overall totals for rendered time and tardiness across the selected period, and provides a Save Record functionality for seamless archival and HR report export."
    },
    {
        image: "images/HRIS_9.png",
        title: "Payroll Processing",
        description: "Once attendance records are saved, the data seamlessly feeds into the Payroll Processing Module where employee compensation and statutory deductions such as Pag-IBIG, PhilHealth, GSIS/SSS, and withholding taxes are calculated. The dashboard provides real-time summary cards tracking metrics like total employees, processed vs. unprocessed records, and overall net salary figures. HR administrators can filter payroll data by Department, Status, Month, or Year, manage employee records with actionable status tags, and export computed payroll summaries directly to Excel for streamlined financial reporting and payslip generation."
    },
    {
        image: "images/HRIS_10.png",
        title: "Payroll Processed",
        description: "This phase acts as a key verification layer in the Payroll Processed Module, allowing HR administrators to double-check and validate computed salaries, rates, and adjustments prior to final release. The screen displays finalized summary metrics such as Total Employees, Processed Records, and Total Net Salary figures and provides administrators with complete control to perform audit checks, toggle between pending or released statuses, and execute bulk processing using the Release Selected action."
    },
    {
        image: "images/HRIS_11.png",
        title: "Payroll Released",
        description: "The Payroll Release Module serves as the final distribution stage where processed salary statements and generated payslips are officially issued to employees. HR administrators can review finalized financial summaries including Total Released records, Gross Salary, Net Salary, and exact Release Dates and trigger the automated Send Payslips action to deliver detailed payslip notifications directly to employees' email addresses."
    },
    {
        image: "images/HRIS_12.png",
        title: "User Management",
        description: "The User Management Module provides a centralized control hub for managing user accounts, roles, and granular page access permissions. System administrators can monitor account distributions categorized into Superadmins, Administrators, and Staff Members while utilizing quick action controls like Grant Staff Access, Grant Admin Access, and Page Management. Featuring real-time search filtering, dynamic role assignment, and profile management tools, this administrative module ensures strict system security and proper Role-Based Access Control (RBAC) across the platform."
    },
    
];


const barangayImages = [
    {
        image: "images/BRGY_1.png",
        title: "Login Page",
        description: "Email Verification Login sends a verification code to the employee’s registered Gmail upon login. Ensures secure access by confirming the employee’s identity.Uses time-limited codes to prevent unauthorized logins."
    },
    {
        image: "images/BRGY_3.png",
        title: "Dashboard",
        description: "The Home page serves as the main dashboard of the Calocan Barangay 145 Record and Request Management System, featuring a left-side navigation menu and top statistics cards that summarize total residents, issued certificates, households, and health checkups. It includes quick action buttons for instantly adding residents or issuing certificates, a central area displaying community demographics and a calendar for October 2026, and a recent activity log on the bottom right that tracks the latest updates and transactions in the system."
    },
    {
        image: "images/BRGY_4.png",
        title: "Residents Page",
        description: "The residents page allows you to quickly find individuals using the top Search Bar—complete with names, addresses, and filtering options—while browsing through individual Resident Cards that display key details like age, address, and personal information. You can easily manage records by clicking the Pen icon to Edit or the Trash Bin icon to Delete a resident, or add a new one by clicking the plus sign (+) button at the bottom right to open a pop-up window where you simply fill in fields like name, address, birthday, contact number, and civil status before clicking Save at the bottom."
    },
    {
        image: "images/BRGY_5.png",
        title: "Reports Page",
        description: "The Reports Page summarizes all document requests and resident activities to help track total certificates issued and their specific reasons, featuring a top search and filtering section to look up specific months, years, or resident details, as well as summary charts that display request counts for documents like Barangay Indigency or Clearance. Additionally, it includes a Download PDF button at the top right that allows you to generate, save, or print physical record copies of all document reports."
    },
    {
        image: "images/BRGY_6.png",
        title: "Certificate",
        description: "The Certificates section on the sidebar is where official documents for residents are created, and clicking it reveals a list of various documents such as Indigency, Barangay Clearance, or Certificate of Action."
    },
    {
        image: "images/BRGY_7.png",
        title: "Users Page",
        description: "The Users page on the sidebar allows administrators to manage system accounts by viewing a complete list of users showing their username, name, role such as ADMIN, CHAIRMAN, or STAFF, and creation date while providing individual edit and delete action buttons alongside an add user button at the top right to easily register new system users."
    },
];

// ==============================
// START TYPING EFFECT
// ==============================


/* ===== SCROLL REVEAL ===== */

function initScrollReveal() {
    const sections = document.querySelectorAll(
        "#about, #skills, #portfolio, #contact"
    );

    sections.forEach(section => {
        section.classList.add("reveal");
    });

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                // Remove this line if you want each section
                // to animate only the first time it appears.
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal);
} else {
    initScrollReveal();
}


 
const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const closeCertificateModal = document.getElementById("closeCertificateModal");

if (certificateModal && certificateModalImage &&
    certificateModalTitle && closeCertificateModal) {

    // Ilipat ang modal sa body para hindi maapektuhan ng book layout
    document.body.appendChild(certificateModal);

    const certificateBox =
        certificateModal.querySelector(".certificate-modal-box");

    // Buksan ang tamang certificate
    document.querySelectorAll(
        "#certificates-content .certificate-card"
    ).forEach(card => {

        const image = card.querySelector(".certificate-image img");
        const link = card.querySelector(".certificate-info a");
        const title = card.querySelector(".certificate-info h3");

        function openCertificate(event) {
            event.preventDefault();
            event.stopPropagation();

            // Kunin ang image ng mismong card na pinindot
            certificateModalImage.src = image.src;
            certificateModalImage.alt = image.alt || "Certificate";

            certificateModalTitle.textContent =
                title ? title.textContent.trim() : "Certificate";

            // I-reset ang scroll kapag ibang certificate ang binuksan
            if (certificateBox) {
                certificateBox.scrollTop = 0;
            }

            // Ipakita ang modal
            certificateModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        image.addEventListener("click", openCertificate);

        if (link) {
            link.addEventListener("click", openCertificate);
        }
    });

    // Isara ang modal at linisin ang image
    function closeCertificate() {
        certificateModal.classList.remove("active");
        certificateModalImage.removeAttribute("src");
        document.body.style.overflow = "";
    }

    closeCertificateModal.addEventListener(
        "click",
        closeCertificate
    );

    // Isara kapag sa labas ng modal box nag-click
    certificateModal.addEventListener("click", function(event) {
        if (event.target === certificateModal) {
            closeCertificate();
        }
    });

    // Isara gamit ang ESC
    document.addEventListener("keydown", function(event) {
        if (
            event.key === "Escape" &&
            certificateModal.classList.contains("active")
        ) {
            closeCertificate();
        }
    });
}


/* ===== PORTFOLIO DARK MODE ===== */
(function () {
    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const icon = toggle.querySelector("i");
    const savedTheme = localStorage.getItem("portfolioTheme");

    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);

        if (icon) {
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
        }

        toggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        toggle.title = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";
    }

    applyTheme(savedTheme === "dark");

    toggle.addEventListener("click", function () {
        const isDark = !document.body.classList.contains("dark-mode");

        applyTheme(isDark);
        localStorage.setItem(
            "portfolioTheme",
            isDark ? "dark" : "light"
        );
    });
})();


/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");

        hamburger.setAttribute("aria-expanded", isOpen);
        hamburger.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open navigation menu");
        });
    });
}


typeEffect();
