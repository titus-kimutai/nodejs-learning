import express from "express";
import cookieParser from "cookie-parser"; // Import cookie-parser
import router from "../src/routes/eventRoutes.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Use our router
app.use(router);

const PORT = process.env.PORT || 4300;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
