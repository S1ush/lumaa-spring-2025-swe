# Lumaa SWE Challenge 

Name: Yash Bhole
Contact: ybhole@binghamton.edu

## Demo Video
[Link to Demo Video](https://drive.google.com/file/d/1ijjpQ71UIvb47O26bhqBD-LYw0APJwrJ/view?usp=sharing)

## Tech Stack

### Backend
- NestJS
- PostgreSQL with Prisma ORM
- JWT Authentication
- TypeScript

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios


## Setup

### Backend Setup

1. Navigate to the backend directory
```bash
cd task-m-backend
```

2. Create `.env` file by duplicating `.env.example`
```bash
cp .env.example .env
```

3. Update the `.env` file with your PostgreSQL credentials and other configurations:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/task_management_db"

```

4. Install dependencies
```bash
npm install
```

5. Run database migrations
```bash
npx prisma migrate deploy
```

6. Generate Prisma Client
```bash
npx prisma generate
```

7. Start the development server
```bash
npm run start:dev
```

The backend will be running on http://localhost:3333

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd task-m-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The frontend will be running on http://localhost:5173

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Testing

Currently, the application doesn't include automated tests. Manual testing can be performed through the UI or using API testing tools like Postman.

The API can be tested using the following endpoints in Postman:

1. Register a new user
```http
POST http://localhost:3333/auth/register
Content-Type: application/json

{
    "username": "testuser",
    "password": "password123"
}
```

2. Login
```http
POST http://localhost:3333/auth/login
Content-Type: application/json

{
    "username": "testuser",
    "password": "password123"
}
```

3. Create a task (requires authentication token)
```http
POST http://localhost:3333/tasks
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
    "title": "Test Task",
    "description": "This is a test task"
}
```

## Future Improvements
- Add unit tests and integration tests
- Implement task filtering and sorting
- Add user profile management
- Improve error handling
- Add loading states and better user feedback

## Salary Expectations

Expected salary range: $20 - $30 per hour (part-time)

Open for Full-Time and negotiation

## Author

Yash Bhole
