const config =require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");


const mongoose = require("mongoose");
mongoose.connect(config.mongoUrl);
if (mongoose.connection.readyState) {
    console.log("MongoDb is connected");
}

const corsOpts = {
    origin: '*',
}

app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);


app.listen(config.port, () => {
    console.log(`Server is running ${config.port}`);
});






// const express = require("express")
// const cors = require('cors')
// const mongoose = require('mongoose')
// const app = express()

// const AuthRouter = require('./routes/authRoutes')
// const AdminRouter = require('./routes/adminRoutes')
// const port = 5000

// mongoose.connect("mongodb+srv://amalmartin1724:CNjCC1hcP8kBisPa@cluster0.nq2q1dr.mongodb.net/realestate?retryWrites=true&w=majority&appName=Cluster0").then(() => {
//     console.log(`DB Connected`)
// }).catch(error => {
//     console.log(error)
// })

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.use('/api/auth', AuthRouter)
// app.use('/api/admin', AdminRouter)

// app.listen(port, () => console.log(`Server Running on port:${port}`))

// // CNjCC1hcP8kBisPa