import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000; // Port si toos ah loogu hardcode-gareeyay

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express Server 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
