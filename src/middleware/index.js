import express from "express";
import cookieParser from "cookie-parser";

import authenticated from "./authenticated.js";
import hasRole from "./hasRole.js";
import roles from "../constants/roles.js";
import {
  AUTH_ROUTES_PREFIX,
  ADMIN_ROUTES_PREFIX,
  SECURE_POST_ROUTES_PREFIX,
  POST_ROUTES_PREFIX,
  COMMENT_ROUTES_PREFIX,
} from "../constants/routes.js";

export const setupMiddleware = app => {
  // Базовые middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Middleware для CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  // Аутентификация для всех роутов, кроме /auth/*
  app.use((req, res, next) => {
    if (req.path.includes(AUTH_ROUTES_PREFIX)) return next();

    authenticated(req, res, next);
  });
  app.use((req, res, next) => {
    if (
      req.path.includes(ADMIN_ROUTES_PREFIX) ||
      (req.path.includes(POST_ROUTES_PREFIX) &&
        SECURE_POST_ROUTES_PREFIX.some(prefix => req.path.includes(prefix))) ||
      (req.path.includes(COMMENT_ROUTES_PREFIX) && req.method === "DELETE")
    )
      return hasRole([roles.ADMIN])(req, res, next);
    next();
  });

  return {
    requireAdmin: hasRole([roles.ADMIN]),
    requireUser: hasRole([roles.USER]),
  };
};
