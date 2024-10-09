const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOURL ||
    "mongodb+srv://mahakgm0827:pZ9Dk87WlZbWOxze@region-in-aws.fiufq.mongodb.net/travel_blog?retryWrites=true&w=majority&appName=Region-IN-AWS"
);
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("DB Connected");
});
connection.on("error", () => console.log("DB Error"));
module.exports = mongoose;
