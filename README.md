This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and coded using Typescript.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
or [Live Link](https://task-mgmt-api.vercel.app/) and use the APIs mentioned below.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Setup Database
Powered by Vercel KV for Redis DB, this smart solution is reliable, fast and persistent. Setup Vercel KV using following steps
1. After deploying the project on Vercel, head to the storage tab
2. Click on Create New Database
3. Choose Redis/ Vercel KV
4. Enter name for your DB and select region
5. After successful connection, move all the env varaibles to your local env file

That's it, you are all set up to use Vercel Kv for your API usage. Head over to [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv) to learn how manage DB using CLI or to use it in your frontend.

## APIs Guide
Now manage all the CRUD operations with these four simple APIs
Base URL: [https://task-mgmt-api.vercel.app](https://task-mgmt-api.vercel.app)
### Create a Task
- **Method:** `POST`
- **Endpoint:** `/api/tasks`
- **Description:** Adds a new task.
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
- *Response:* Returns the created task object with a unique ID.

### Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/api/tasks`
- **Description:** Gets all the tasks present in DB.
- *Response:*  Returns an array of task objects.

### Update a Task
- **Method:** `PUT`
- **Endpoint:** `/api/update?id={taskId}`
- **Description:** Updates a task based on taskId.
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "pending/completed"
  }
- *Response:* Returns the updated task object.

### Delete a Task
- **Method:** `DELETE`
- **Endpoint:** `/api/remove?id={taskId}`
- **Description:** Deletes a task based on taskId.
- *Response:* Returns status code of `204`.
  

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
