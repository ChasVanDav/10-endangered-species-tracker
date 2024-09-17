# Eventonica

Eventonica is a web application built with React and Express.js that allows users to manage events. Users can view, add, update, and delete events stored in a PostgreSQL database. The project demonstrates a full-stack setup, including a frontend for interacting with the event data and a backend API to handle data persistence.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Add Events**: Users can create new events with a name, date, and location.
- **View Events**: Display a list of all events from the database.
- **Update Events**: Users can update event details such as name, date, and location.
- **Delete Events**: Users can delete events from the database.

## Technologies

- **Frontend**: 
  - React
  - React-Bootstrap
  - Fetch API
  
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository:
```
git clone https://github.com/ChasVanDav/eventonica-project.git
cd eventonica-project

```

### 2. Install dependencies for the backend:
```
cd backend
npm install

```

### 3. Set up PostgreSQL:
```
Create a PostgreSQL database.
Update the connection details in backend/db.js.

```

### 4. Install dependencies for the frontend:
```
cd ../frontend
npm install

```

### 5. Run the application:
Start the backend server:
```
cd backend
npm start

```

Start the React frontend:

```
cd ../frontend
npm start

```

### Usage
Once the application is running, you can perform the following actions:

Add Events: Use the form on the main page to add a new event.
View Events: A list of events is displayed on the main page.
Edit Events: Click the edit icon on any event card to update event details.
Delete Events: Use the delete button to remove an event.

### API Endpoints
Here are the available API endpoints for the backend:

GET /api/events - Fetch all events
POST /api/events - Add a new event
PUT /api/events/:id - Update an event by ID
DELETE /api/events/:id - Delete an event by ID

### Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes and push your branch.
Create a pull request with a detailed description of your changes.