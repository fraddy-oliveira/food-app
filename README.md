# Food App

The food app helps restaurants manage their marketing campaigns and promotional offers on food delivery platforms.

The project consists of a frontend (available in the `client` directory) and a backend (available in the `server` directory).

## How to run the application locally?

The application can be started using Docker or by explicitly starting it from the client and server directories. I would recommend running the application using Docker. However, both methods are defined below.

### Run application using Docker

#### Prerequisite

- `Docker` installed on system
- `Docker Compose` installed on system

#### Steps

- Clone the repository using git clone `git clone https://github.com/fraddy-oliveira/food-app.git`.
- Navigate to the project's root directory.
- Run the command `docker-compose up -d` to start the entire application.
- Access the frontend at `http://localhost:3000`.
- Access the backend API at `http://localhost:5001`.

### Run application using Manually

Here, we need to run the frontend and backend separately.

#### Prerequisite

- Install the latest version of Node.js.

#### Steps

- Clone the repository using `git clone https://github.com/fraddy-oliveira/food-app.git`.
- To run the backend, navigate to the server directory under the project's root directory.
- Create a file named `.env` and add the following content:

```sh
PORT=5001
```

- Run `npm install` to install backend dependencies.

- Run `npm run dev` to start the backend. The backend will now be available at `http://localhost:5001`.

- To run the frontend, navigate to the `client` directory from the root of the project.

- Create a file named `.env.local` and add the following content:

```sh
NODE_ENV=development
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5001
```

- Run `npm install` to install frontend dependencies.
- Run `npm run dev` to start the frontend. The frontend should now be available at `http://localhost:3000`.

## How to Access the Backend API?

- The backend API is a REST API.
- The following endpoints are available:
  - Create a campaign: `POST /campaign`
  - List all campaigns: `GET /campaign`
  - Edit a campaign: `PATCH /campaign/ba913a85-0d74-44bf-bde4-ba55b5e097d5`
- The API collection is stored in the `docs` folder under the project's root directory.

## Explanations of what was missed out:

- Implementation of editing the campaign from the frontend is pending. However, the backend API endpoint to update the campaign is complete.
- Adding multiple timings for a single weekday is not implemented in the frontend. However, the functionality is implemented in the backend API.

## Explanations of any major decisions:

- `Next scheduled activation` is kept optional.
- Defining weekly timing is kept optional.
- The data for the campaign is stored in memory and is not persisted to the database.

## Explanations of any possible further improvements:

- I can add a `status` field for a campaign. The current implementation defaults the `status` to `Scheduled`. We can have multiple statuses to indicate the progress of the campaign. We can store the history of statuses per campaign and show this history to restaurants on the web app.
- I have added `title` and `tagline` to the campaign.
- Add test cases.
- Validation for dates and times can be added.
- Persist the campaign to the database.
- Improve frontend design.
- Add authentication for restaurants.
