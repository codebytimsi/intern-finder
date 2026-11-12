const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const OPENINTERN_API_URL =
    "https://openintern.dev/api/v1/jobs";

app.use(express.static(__dirname));


// =========================
// API ROUTE
// =========================

app.get("/api/jobs", async (req, res) => {

    try {

        const keyword =
            (req.query.q || "")
                .toLowerCase()
                .trim();

        let role =
            "software,backend,frontend,fullstack,data,ml,product";

        let shouldUseKeywordSearch = true;


        // =========================
        // WEB DEVELOPMENT
        // =========================

        if (
            keyword.includes("web development") ||
            keyword.includes("web developer") ||
            keyword === "web" ||
            keyword.includes("frontend") ||
            keyword.includes("front end") ||
            keyword.includes("front-end") ||
            keyword.includes("react") ||
            keyword.includes("javascript") ||
            keyword.includes("html") ||
            keyword.includes("css")
        ) {

            role = "frontend,fullstack";

            shouldUseKeywordSearch = false;
        }


        // =========================
        // BACKEND
        // =========================

        else if (
            keyword.includes("backend") ||
            keyword.includes("back end") ||
            keyword.includes("back-end") ||
            keyword.includes("node") ||
            keyword.includes("java")
        ) {

            role = "backend";

            shouldUseKeywordSearch = false;
        }


        // =========================
        // DATA
        // =========================

        else if (
            keyword.includes("data analytics") ||
            keyword.includes("data analyst") ||
            keyword.includes("data analysis") ||
            keyword === "data" ||
            keyword.includes("analytics") ||
            keyword.includes("analyst")
        ) {

            role = "data,ml";

            shouldUseKeywordSearch = false;
        }


        // =========================
        // FULL STACK
        // =========================

        else if (
            keyword.includes("fullstack") ||
            keyword.includes("full stack") ||
            keyword.includes("full-stack")
        ) {

            role = "fullstack";

            shouldUseKeywordSearch = false;
        }


        // =========================
        // UI / UX
        // =========================

        else if (
            keyword.includes("ui/ux") ||
            keyword.includes("ui ux") ||
            keyword.includes("ui designer") ||
            keyword.includes("ux designer") ||
            keyword.includes("user interface") ||
            keyword.includes("user experience") ||
            keyword.includes("product designer") ||
            keyword.includes("interaction designer")
        ) {

            role = "product";

            shouldUseKeywordSearch = false;
        }


        // =========================
        // MARKETING
        // =========================

        else if (
            keyword.includes("marketing") ||
            keyword.includes("digital marketing") ||
            keyword.includes("social media marketing")
        ) {

            // Marketing is not a dedicated OpenIntern
            // role, so use a general search.
            role = "software,product";

            shouldUseKeywordSearch = true;
        }


        // =========================
        // API PARAMETERS
        // =========================

        const params = new URLSearchParams({

            role: role,

            // Request a larger pool
            limit: "100"
        });


        // =========================
        // DURATION
        // =========================

        const duration =
            req.query.duration;

        if (duration) {

            params.append(
                "duration_months",
                duration
            );
        }


        // =========================
        // GENERAL SEARCH
        // =========================

        if (
            keyword &&
            shouldUseKeywordSearch
        ) {

            params.append(
                "q",
                keyword
            );
        }


        console.log(
            `Searching OpenIntern: keyword="${keyword}", role="${role}", duration="${duration || "all"}"`
        );


        const response =
            await fetch(
                `${OPENINTERN_API_URL}?${params.toString()}`
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "OpenIntern API error:",
                errorText
            );

            return res
                .status(response.status)
                .json({
                    error:
                        "Unable to fetch internships right now."
                });
        }


        const data =
            await response.json();


        res.json(data);


    } catch (error) {

        console.error(
            "Server error:",
            error
        );

        res.status(500).json({

            error:
                "Something went wrong while fetching internships."

        });
    }
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `InternFinder server running at http://localhost:${PORT}`
    );

});