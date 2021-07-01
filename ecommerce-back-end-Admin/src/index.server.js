const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

//routes
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");

//environment variable or you can say constants
env.config();

// mongodb connection

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Database connection is established`);
  })
  .catch((error) => {
    console.log(`Database connection errr ${error}`);
  });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
