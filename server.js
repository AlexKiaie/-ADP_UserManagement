const express = require("express");
const db = require("./data/index.js");
const config = require("./config.js");

const PORT = process.env.PORT || 8080;

const app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require("./routes.js")(app);

db.mongoose
  .connect(config.dbUrl, {})
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });