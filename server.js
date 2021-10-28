const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';


const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: ["https://jsramverk-editor-ersr20.azurewebsites.net", 'http://localhost:8081']
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html")
});

const db = require("./app/models");
//db.sequelize.sync();
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


require("./app/routes/textEditor.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/graphql.routes")(app);
require("./app/routes/mail.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: ['https://jsramverk-editor-ersr20.azurewebsites.net', "http://localhost:8081"],
    methods: ["GET", "POST"]
  }
});

app.set('socketio', io);

io.on('connection', socket => {
  console.log("connection! io.on")
  socket.on('join-room', (room) => {
    console.log("socket on join room")
    socket.join(room)
  })
  socket.on('get-text', (str, title, room) => {
    console.log("socket on get text")
    io.to(room).emit("str", str, title);
  })
});
