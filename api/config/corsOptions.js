// Whitelisted domains for cross-origin requests
const whitelist = [
  "http://127.0.0.1:5500",  
  "http://localhost:3500",
  "http://localhost:3000"    
];

// CORS configuration options
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the whitelist or if no origin (for local calls)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200 
}

module.exports = corsOptions;
