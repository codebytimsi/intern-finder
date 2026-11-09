// =========================
// INTERNSHIP DATA
// =========================

let internships = [];


// =========================
// DOM ELEMENTS
// =========================

const internshipContainer =
    document.getElementById("internshipContainer");

const resultsCount =
    document.getElementById("resultsCount");

const noResults =
    document.getElementById("noResults");

const searchInput =
    document.getElementById("search");

const locationInput =
    document.getElementById("location");

const searchBtn =
    document.getElementById("searchBtn");

const categoryFilter =
    document.getElementById("categoryFilter");

const modeFilter =
    document.getElementById("modeFilter");

const durationFilter =
    document.getElementById("durationFilter");


// =========================
// FETCH REAL INTERNSHIPS
// =========================

async function loadInternships() {

    internshipContainer.innerHTML = `
        <p style="text-align:center; padding:30px;">
            Loading internships...
        </p>
    `;

    try {

        const response = await fetch("/api/jobs");

        if (!response.ok) {
            throw new Error("Failed to fetch internships");
        }

        const data = await response.json();

        // OpenIntern groups jobs by role family.
        // We flatten the postings into individual internships.

        internships = [];

        data.jobs.forEach((job) => {

            if (!job.postings || job.postings.length === 0) {
                return;
            }

            job.postings.forEach((posting) => {

                const location =
                    posting.location || "Not specified";

                const mode =
                    location.toLowerCase().includes("remote")
                        ? "remote"
                        : "onsite";

                const category =
                    getCategory(job.title);

                const duration =
                    getDuration(job);

                internships.push({

                    title: job.title || "Internship",

                    company:
                        typeof job.company === "string"
                        ? job.company
                        : "Company",

                    location: location,

                    mode: mode,

                    category: category,

                    duration: duration,

                    stipend: "Not specified",

                    logo: getLogo(job.company),

                    applyUrl:
                        posting.apply_url || "#"

                });

            });

        });

        console.log(
            "Internships loaded:",
            internships.length
        );

        filterInternships();

    } catch (error) {

        console.error(
            "Error loading internships:",
            error
        );

        internshipContainer.innerHTML = `
            <p style="text-align:center; padding:30px;">
                Unable to load internships right now.
                Please try again.
            </p>
        `;

        resultsCount.textContent = "0";
    }
}


// =========================
// GET CATEGORY
// =========================

function getCategory(title) {

    const value = title.toLowerCase();

    if (
        value.includes("frontend") ||
        value.includes("front-end") ||
        value.includes("front end") ||
        value.includes("full stack") ||
        value.includes("full-stack") ||
        value.includes("react") ||
        value.includes("javascript") ||
        value.includes("web") ||
        value.includes("html") ||
        value.includes("css")
    ) {
        return "web-development";
    }

    if (
        value.includes("backend") ||
        value.includes("back-end") ||
        value.includes("back end") ||
        value.includes("node") ||
        value.includes("software") ||
        value.includes("developer") ||
        value.includes("engineering")
    ) {
        return "software-development";
    }

    if (
        value.includes("data") ||
        value.includes("analytics") ||
        value.includes("machine learning") ||
        value.includes("ai")
    ) {
        return "data";
    }

    if (
        value.includes("design") ||
        value.includes("ui") ||
        value.includes("ux")
    ) {
        return "design";
    }

    if (
        value.includes("marketing")
    ) {
        return "marketing";
    }

    return "software-development";
}


// =========================
// GET DURATION
// =========================

function getDuration(job) {

    if (
        job.duration_months &&
        job.duration_months.length > 0
    ) {

        return String(
            job.duration_months[0]
        );

    }

    return "Not specified";
}


// =========================
// GET COMPANY LOGO
// =========================

function getLogo(company) {

    const companyName =
        typeof company === "string"
            ? company
            : "Company";

    const words =
        companyName.trim().split(/\s+/);

    if (words.length >= 2) {

        return (
            words[0][0] +
            words[1][0]
        ).toUpperCase();

    }

    return companyName
        .substring(0, 2)
        .toUpperCase();
}


// =========================
// DISPLAY INTERNSHIPS
// =========================

function displayInternships(data) {

    internshipContainer.innerHTML = "";

    resultsCount.textContent = data.length;

    if (data.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";


    data.forEach((internship) => {

        const card =
            document.createElement("article");

        card.classList.add(
            "internship-card"
        );

        card.innerHTML = `

            <div class="company-logo">
                ${internship.logo}
            </div>

            <h3>
                ${internship.title}
            </h3>

            <p class="company-name">
                ${internship.company}
            </p>

            <div class="card-details">

                <span class="detail-tag">
                    📍 ${internship.location}
                </span>

                <span class="detail-tag">
                    💻 ${formatMode(internship.mode)}
                </span>

                <span class="detail-tag">
                    ⏳ ${formatDuration(internship.duration)}
                </span>

                <span class="detail-tag">
                    💰 ${internship.stipend}
                </span>

            </div>

            <a
                href="${internship.applyUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="apply-btn"
            >
                Apply Now ↗
            </a>

        `;

        internshipContainer.appendChild(card);

    });
}


// =========================
// FORMAT WORK MODE
// =========================

function formatMode(mode) {

    if (mode === "remote") {
        return "Remote";
    }

    if (mode === "hybrid") {
        return "Hybrid";
    }

    if (mode === "onsite") {
        return "On-site";
    }

    return "Not specified";
}


// =========================
// FORMAT DURATION
// =========================

function formatDuration(duration) {

    if (
        !duration ||
        duration === "Not specified"
    ) {
        return "Not specified";
    }

    return `${duration} Months`;
}


// =========================
// FILTER INTERNSHIPS
// =========================

function filterInternships() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    const locationValue =
        locationInput.value
            .toLowerCase()
            .trim();

    const categoryValue =
        categoryFilter.value;

    const modeValue =
        modeFilter.value;

    const durationValue =
        durationFilter.value;


    const filteredInternships =
        internships.filter((internship) => {

           const matchesSearch =

                internship.title
                    .toLowerCase()
                    .includes(searchValue) ||

                internship.company
                    .toLowerCase()
                    .includes(searchValue) ||

                internship.location
                    .toLowerCase()
                    .includes(searchValue) ||

                (
                    searchValue.includes("frontend") &&
                    internship.category === "web-development"
                ) ||

                (
                    searchValue.includes("react") &&
                    internship.title
                        .toLowerCase()
                        .includes("react")
                ) ||

                (
                    searchValue.includes("backend") &&
                    (
                        internship.title
                            .toLowerCase()
                            .includes("backend") ||
                        internship.category === "software-development"
                    )
                ) ||

                (
                    searchValue.includes("software") &&
                    internship.category === "software-development"
                ) ||

                (
                    searchValue.includes("data") &&
                    internship.category === "data"
                ); 


            const matchesLocation =

                internship.location
                    .toLowerCase()
                    .includes(locationValue);


            const matchesCategory =

                categoryValue === "all" ||

                internship.category ===
                categoryValue;


            const matchesMode =

                modeValue === "all" ||

                internship.mode ===
                modeValue;


            const matchesDuration =

                durationValue === "all" ||

                checkDuration(
                    internship.duration,
                    durationValue
                );


            return (

                matchesSearch &&

                matchesLocation &&

                matchesCategory &&

                matchesMode &&

                matchesDuration

            );

        });


    displayInternships(
        filteredInternships
    );
}


// =========================
// DURATION FILTER
// =========================

function checkDuration(
    duration,
    selectedDuration
) {

    const months =
        Number(duration);

    if (
        isNaN(months)
    ) {
        return false;
    }

    if (
        selectedDuration === "1-3"
    ) {
        return (
            months >= 1 &&
            months <= 3
        );
    }

    if (
        selectedDuration === "3-6"
    ) {
        return (
            months >= 3 &&
            months <= 6
        );
    }

    if (
        selectedDuration === "6+"
    ) {
        return months > 6;
    }

    return true;
}

// =========================
// API SEARCH
// =========================

async function searchInternshipsFromAPI() {

    const searchValue =
        searchInput.value.trim();

    const durationValue =
    durationFilter.value;

   if (!searchValue && durationValue === "all") {
    loadInternships();
    return;
    }

    internshipContainer.innerHTML = `
        <p style="text-align:center; padding:30px;">
            Searching internships...
        </p>
    `;

    try {

        let apiUrl = "/api/jobs";

const params = new URLSearchParams();

if (searchValue) {
    params.append("q", searchValue);
}

if (durationValue !== "all") {
    if (durationValue === "1-3") {
        params.append("duration", "1,2,3");
    }

    else if (durationValue === "3-6") {
        params.append("duration", "3,4,5,6");
    }

    else if (durationValue === "6+") {
        params.append(
            "duration",
            "7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24"
        );
    }
}

if (params.toString()) {
    apiUrl += `?${params.toString()}`;
}

const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const data = await response.json();

        internships = [];

        data.jobs.forEach((job) => {

            if (!job.postings) {
                return;
            }

            job.postings.forEach((posting) => {

                const location =
                    posting.location || "Not specified";

                const mode =
                    location
                        .toLowerCase()
                        .includes("remote")
                        ? "remote"
                        : "onsite";


                internships.push({

                    title:
                        job.title || "Internship",

                    company:
                        typeof job.company === "string"
                            ? job.company
                            : "Company",

                    location:
                        location,

                    mode:
                        mode,

                    category:
                        getCategory(job.title || ""),

                    duration:
                        getDuration(job),

                    stipend:
                        "Not specified",

                    logo:
                        getLogo(job.company),

                    applyUrl:
                        posting.apply_url || "#"
                });

            });

        });

        displayInternships(internships);

    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        internshipContainer.innerHTML = `
            <p style="text-align:center; padding:30px;">
                Unable to search internships right now.
            </p>
        `;

        resultsCount.textContent = "0";
    }
}


// =========================
// EVENT LISTENERS
// =========================

searchBtn.addEventListener(
    "click",
    searchInternshipsFromAPI
);

searchInput.addEventListener(
    "input",
    filterInternships
);


locationInput.addEventListener(
    "input",
    filterInternships
);


categoryFilter.addEventListener(
    "change",
    filterInternships
);


modeFilter.addEventListener(
    "change",
    filterInternships
);


durationFilter.addEventListener(
    "change",
    searchInternshipsFromAPI
);


// =========================
// INITIAL LOAD
// =========================

loadInternships();