import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Mock Database
  const users: any[] = [];

  // API Router
  const apiRouter = express.Router();

  apiRouter.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  apiRouter.post("/auth/register", (req, res) => {
    const { email, password, name } = req.body;
    console.log(`Register attempt: ${email}`);
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = { id: Date.now().toString(), email, password, name };
    users.push(newUser);
    res.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, token: "mock-jwt-token" });
  });

  apiRouter.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token: "mock-jwt-token" });
  });

  apiRouter.post("/learning/update", (req, res) => {
    const { update } = req.body;
    console.log("Received privacy-preserving model update:", update);
    res.json({ status: "success", message: "Global model improved anonymously" });
  });

  app.use("/api", apiRouter);

  // 404 handler for API routes
  app.use("/api/*", (req, res) => {
    console.log(`404 API: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
