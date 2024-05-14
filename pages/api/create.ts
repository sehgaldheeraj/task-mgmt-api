import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../types/task";
import { v4 as uuidv4 } from "uuid";
import kv from "@vercel/kv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { title, description, status } = req.body;

      if (!title || !description) {
        res.status(400).json({ error: "Title and description are required" });
        return;
      }

      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        status: status || "pending",
      };

      await kv.set(newTask.id, JSON.stringify(newTask));
      console.log("Task stored:", newTask); // Log the stored task
      res.status(201).json(newTask);
    } else if (req.method === "GET") {
      const keys = await kv.keys("*"); // Provide a pattern argument to match all keys
      console.log("Fetched keys:", keys); // Log the keys fetched from KV

      const tasks = await Promise.all(
        keys.map(async (key) => {
          const taskData = await kv.get(key);
          console.log(`Fetched task data for key ${key}:`, taskData); // Log the task data fetched

          if (taskData && typeof taskData === "string") {
            try {
              return JSON.parse(taskData) as Task;
            } catch (parseError) {
              console.error(`Error parsing task with key ${key}:`, parseError);
              return null;
            }
          }
          return null;
        })
      );

      const validTasks = tasks.filter((task) => task !== null);
      console.log("Valid tasks:", validTasks); // Log the valid tasks after filtering

      res.status(200).json(validTasks);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
