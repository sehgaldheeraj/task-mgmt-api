import { NextApiRequest, NextApiResponse } from "next";
import kv from "@vercel/kv";
import { Task } from "../../types/task";

/**
 * Handles the PUT request to update a task with the provided ID, title, description, and status.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} A promise that resolves when the task is successfully updated.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "PUT") {
      res.setHeader("Allow", ["PUT"]);
      res
        .status(405)
        .end(`Method ${req.method} Is Not Allowed. Use PUT Instead.`);
      return;
    }

    const { id } = req.query;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const taskData = await kv.get(id as string);
    if (!taskData) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    console.log(taskData);

    const task: Task = taskData as Task;
    task.title = title;
    task.description = description;
    task.status = status;

    await kv.set(id as string, JSON.stringify(task));

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
