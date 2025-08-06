import type { NextFunction, Request, Response } from "express";
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ratelimit.limit("my-rate-limit");
    if (!result) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate Limit Error", error);
    next(error);
  }
};
