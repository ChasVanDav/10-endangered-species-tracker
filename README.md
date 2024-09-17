# Eventonica

Welcome to **Eventonica**! This web app, crafted with React and Express.js, is your go-to tool for managing events. With Eventonica, you can easily add, view, update, and delete events, all thanks to a PostgreSQL database keeping everything in check.

This project showcases a smooth full-stack setup: a snappy frontend for interacting with your events and a solid backend API ensuring your data is always in sync.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

Here’s what you can do with Eventonica:

- **Add Events**: Create new events by filling out a simple form with the event name, date, and location.
- **View Events**: Check out a list of all your events right on the main page.
- **Update Events**: Need to make changes? Just click on the edit icon and update event details.
- **Delete Events**: Removing an event is a breeze with the delete button.

## Technologies

Here’s the tech stack behind Eventonica:

- **Frontend**:
  - React: For a dynamic and responsive user experience.
  - React-Bootstrap: To keep things looking sharp and stylish.
  - Fetch API: For smooth data fetching and updates.

- **Backend**:
  - Node.js: Powering the server side.
  - Express.js: Handling API requests with ease.
  - PostgreSQL: Storing and managing your event data.

## Installation

Ready to get started? Follow these steps to set up Eventonica on your local machine:

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
Once everything’s up and running, you can:

Add Events: Use the form on the main page to add a new event.
View Events: A list of events is displayed on the main page.
Edit Events: Click the edit icon on any event card to update event details.
Delete Events: Use the delete button to remove an event.

### API Endpoints
Here’s how you can interact with the backend API:

GET /api/events - Fetch all events
POST /api/events - Add a new event
PUT /api/events/:id - Update an event by ID
DELETE /api/events/:id - Delete an event by ID

### Contributing
Want to help out? Awesome! Here’s how you can contribute:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes and push your branch.
Create a pull request with a detailed description of your changes.