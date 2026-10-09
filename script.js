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
    }
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



typeEffect();