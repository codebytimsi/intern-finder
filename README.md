# InternFinder 🔎

A responsive internship-finding web application that helps students discover internship opportunities using real-time job data from the OpenIntern API.

## 🚀 Features

- 🔎 Search internships by role, company, or keyword
- 📍 Filter internships by location
- 📂 Filter by category
- 💻 Filter by work mode
- ⏳ Filter by internship duration
- 🔗 Direct application links
- 📱 Responsive design for desktop and mobile
- ⚡ Real internship data through API integration
- 🖥️ Node.js + Express backend for API requests

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**API**
- OpenIntern API

## 📂 Project Structure

```text
internship-finder/
│
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
https://github.com/codebytimsi/intern-finder.git
```

### 2. Open the project folder

```bash
cd internship-finder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open the application

Open:

```text
http://localhost:3000
```

## 🔍 How It Works

InternFinder uses a Node.js and Express backend to communicate with the OpenIntern API.

The frontend sends search and filter requests to the backend, which retrieves internship data from the API and sends the results back to the browser.

The application then displays the internships as responsive cards with important details such as:

- Company
- Internship title
- Location
- Work mode
- Duration
- Application link

## 🎯 Why I Built This

I built InternFinder as a practical full-stack project to improve my understanding of:

- Frontend development
- JavaScript
- REST API integration
- Node.js and Express
- Dynamic data rendering
- Search and filtering
- Responsive web design

## 🔮 Future Improvements

- User authentication
- Save/bookmark internships
- Advanced filtering
- Stipend information
- Internship sorting
- Pagination
- Personalized internship recommendations

## 👩‍💻 Author

**Timsi Thukral**

BCA Student | Aspiring Web Developer

GitHub: https://github.com/codebytimsi
