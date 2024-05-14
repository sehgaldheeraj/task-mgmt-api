import { NextApiRequest, NextApiResponse } from "next";
import kv from "@vercel/kv";
/**
 * Handles API requests for deleting tasks based on ID.
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
    if (req.method !== "DELETE") {
      res.setHeader("Allow", ["DELETE"]);
      res
        .status(405)
        .end(`Method ${req.method} Is Not Allowed. Use DELETE instead.`);
      return;
    }

    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: "Missing ID: ID is required" });
      return;
    }

    await kv.del(id as string);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
