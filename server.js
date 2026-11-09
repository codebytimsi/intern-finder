const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const OPENINTERN_API_URL = "https://openintern.dev/api/v1/jobs";

// Serve frontend files
app.use(express.static(__dirname));


// =========================
// API ROUTE
// =========================

app.get("/api/jobs", async (req, res) => {

    try {

        const keyword =
            (req.query.q || "").toLowerCase().trim();

        let role = "software,frontend,fullstack";

        // Choose API role based on search
        if (
            keyword.includes("frontend") ||
            keyword.includes("front end") ||
            keyword.includes("react") ||
            keyword.includes("javascript") ||
            keyword.includes("web")
        ) {
            role = "frontend";
        }

        else if (
            keyword.includes("backend") ||
            keyword.includes("back end") ||
            keyword.includes("node") ||
            keyword.includes("java")
        ) {
            role = "backend";
        }

        else if (
            keyword.includes("data") ||
            keyword.includes("analyst") ||
            keyword.includes("analytics")
        ) {
            role = "data";
        }

        else if (
            keyword.includes("fullstack") ||
            keyword.includes("full stack") ||
            keyword.includes("full-stack")
        ) {
            role = "fullstack";
        }


        const params = new URLSearchParams({
            role: role,
            limit: "20"
        });

        const duration = req.query.duration;

            if (duration) {
                params.append("duration_months", duration);
            }

        if (keyword) {
            params.append("q", keyword);
        }


        console.log(
            `Searching OpenIntern: keyword="${keyword}", role="${role}"`
        );


        const response = await fetch(
            `${OPENINTERN_API_URL}?${params.toString()}`
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "OpenIntern API error:",
                errorText
            );

            return res.status(response.status).json({
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