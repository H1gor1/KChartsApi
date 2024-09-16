
# KCharts API

This project is a server for the KCharts APIs, providing REST endpoints to capture and return data from the top Korean music charts.

## 🎯 Goal

The aim of this project is to scrape the top songs from the most popular Korean charts (Melon, Flo, Vibe, and Genie) and expose them through RESTful APIs.

## 🚀 Technologies Used

- **TypeScript**: For static typing and better code maintainability.
- **Node.js**: As the server environment.
- **PostgreSQL**: To store the music chart data.
- **Prisma ORM**: For easy database management.
- **Fastify**: A fast, low-overhead web framework for Node.js.
- **Axios**: To handle HTTP requests to the chart sources.
- **Cheerio**: For web scraping and parsing the HTML of the charts.

## 📋 Requirements

Make sure you have the following installed on your machine:

- **Node.js**
  ```bash
  sudo apt install nodejs
  ```
  
- **npm (Node Package Manager)**
  ```bash
  sudo apt install npm
  ```

## 💻 Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/H1gor1/KChartsApi
cd KChartsApi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Seed the database with chart data

```bash
npm run seed
```

### 4. Start the development server

```bash
npm run dev
```

## 🔧 Environment Variables

To run this project, you will need to create a `.env` file in the root directory and set the following environment variable:

```bash
DATABASE_URL=your_postgres_connection_string
```

Make sure to replace `your_postgres_connection_string` with your actual PostgreSQL connection string.

## 📄 API Endpoints

Here are the available API routes that return data from the top music charts:

### GET /api/getMelon
Returns all the songs from the Melon chart.

### GET /api/getVibe
Returns all the songs from the Vibe chart.

### GET /api/getFlo
Returns all the songs from the Flo chart.

### GET /api/getGenie
Returns all the songs from the Genie chart.

### Response Format

Each of these routes returns a list of songs with the following structure:

| Field       | Type     | Description       |
|-------------|----------|-------------------|
| `id`        | `string` | Unique identifier |
| `music_name`| `string` | The song title    |
| `artist`    | `string` | The performing artist |
| `album`     | `string` | {Optional} The album name    |
| `image_url` | `string` | URL to the album cover image |

---

By following these instructions, you'll have your KCharts API up and running in no time, ready to serve the top songs from Korea's biggest music charts.
