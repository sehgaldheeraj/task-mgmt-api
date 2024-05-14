import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../types/task";
import { v4 as uuidv4 } from "uuid";
import kv from "@vercel/kv";
/**
 * Handles API requests for creating and retrieving tasks.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} A promise that resolves when the request is handled.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
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
      const keys = await kv.keys("*");
      console.log("Fetched keys:", keys);

      const tasks: Task[] = [];

      for (const key of keys) {
        const taskData = await kv.get(key);
        tasks.push(taskData as Task);
      }

      console.log("All tasks:", tasks);

      res.status(200).json(tasks);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
