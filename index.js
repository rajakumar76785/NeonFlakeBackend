const express = require("express");
const app = express();

const {cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());

app.use(cors());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

app.use("/api/videos",fileRoutes);
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
