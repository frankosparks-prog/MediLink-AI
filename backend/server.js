const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
require("dotenv").config();
const connectdb = require("./config/db");
const AdminAuth = require("./routes/AdminAuth.js");
const Uploads = require("./routes/UploadRoute.js");
const mail = require("./routes/SendMail.js");
const sms = require("./routes/SmsRoute.js");
const visitor = require("./routes/VisitorRoutes.js");
const auth = require("./routes/LoginSignup.js");
const testimonials = require("./routes/TestimonialsRoute.js");
const faq = require("./routes/FAQRoute.js");
const mpesaRoutes = require("./routes/MpesaRoute.js");
const profile = require("./routes/ProfileRoute.js");
const medication = require("./routes/MedicationRoute.js");
const appointments = require("./routes/AppointmentRoute.js");
const chat = require("./routes/aiRoute.js");
const loginSignup = require("./routes/LoginSignup.js");
const errorHandler = require("./middleware/Errorhandler.js");

dotenv.config();
connectdb();

const app = express();  // Initialize express
app.set('trust proxy', 1);

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // For development
  "http://192.168.103.20:3000", // For local network access
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin); // Log the origin to check the requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', '*'],
  credentials: true, // Allow cookies or credentials if necessary
}));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.use(mongoSanitize());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Rate Limiting to Prevent Abuse
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
}));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log full error
  res.status(500).send({ success: false, message: err.message });
});

// Routes
app.use('/api/sendmail', mail); // Send mail routes
app.use("/api/sms", sms); // File upload routes
app.use("/api/admin", AdminAuth); // Admin Auth routes
app.use("/api/visitors", visitor); // Only authenticated users can track 
app.use("/api/auth", auth); // Authentication routes
app.use("/api/upload", Uploads); // Image upload route
app.use('/api/contact', mail); // Contact form route
app.use("/api/testimonials", testimonials); // Testimonials routes
app.use("/api/faq", faq); // FAQ routes
app.use("/api/mpesa", mpesaRoutes); // M-Pesa routes
app.use("api/profile", profile); // Profile routes
app.use("/api/medication", medication); 
app.use("/api/appointments", appointments); // Appointments routes
app.use("/api/chat", chat); // Chat routes
app.use("/api/loginSignup", loginSignup); 

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Terminating server...");
  process.exit(0);
});

// Listen on the Defined Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
