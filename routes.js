import express from "express";
import auth from "./src/auth/index.js";
import { createBenchmark, userBenchmark } from "./src/controllers/benchmark.controller.js";
import { createUser, loginUser } from "./src/controllers/user.controller.js";
export const router = express.Router();


// User
router.post('/new', createUser);
router.post('/login', loginUser);

// Benchmarks
router.post('/benchmark/new', auth.isUser, createBenchmark);
router.get('/benchmarks', auth.isUser, userBenchmark); 