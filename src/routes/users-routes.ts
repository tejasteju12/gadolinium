import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { prismaClient } from "../extras/prisma";
import { jwtSecretKey } from "../../environment";
export const usersRoutes = new Hono();
usersRoutes.get(
  "/",
  async (context, next) => {
    const token = context.req.header("token");

    if (!token) {
      return context.json(
        {
          message: "Missing Token",
        },
        401
      );
    }

    try {
      const verified = jwt.verify(token, jwtSecretKey);

      await next();
    } catch (e) {
      return context.json(
        {
          message: "Missing Token",
        },
        401
      );
    }
  },
  async (context) => {
    const users = await prismaClient.user.findMany();

    return context.json(users, 200);
  }
);