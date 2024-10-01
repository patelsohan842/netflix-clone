const express=require('express')
const cookieParser =require('cookie-parser')
const path=require('path')

const authRoutes = require('./routes/auth.route.js');
const movieRoutes = require('./routes/auth.route.js');
const tvRoutes = require('./routes/auth.route.js');
const searchRoutes = require('./routes/auth.route.js');

const ENV_VARS = require('./config/envVars.js');
const connectDB = require('./config/db.js');
const protectRoute=require('./middleware/protectRoute.js')
const app =express()
const PORT=ENV_VARS.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT,()=>{
    console.log(`server started||${PORT}`);
    connectDB()
})


// "Mp9owQJXP9RZb6dD"
