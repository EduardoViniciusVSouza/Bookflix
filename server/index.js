require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

PORT = 3001;

const database = require("./Database/Database");

const profile = require("./Models/Profiles").Profile;
const account = require("./Models/Accounts").Account;
const book = require("./Models/Books").Book;

const AuthorizationRouter =
  require("./Routes/Authorization").AuthorizationRouter;
const AuthenticationRouter =
  require("./Routes/Authentication").AuthenticationRouter;
const profileRouter = require("./Routes/Profiles").profileRouter;
const RouterBook = require("./Routes/Books").BookRouter;
const RouterAccount = require("./Routes/Accounts").AccountRouter;
const RouterReservedBook = require("./Routes/ReservedBooks").ReservedBookRouter;

account.belongsTo(profile, { foreignKey: "profileId" });
book.belongsTo(profile, { foreignKey: "profileId" });

async function sync() {
  await profile.sync({ force: true });
  await account.sync({ force: true });
  await book.sync({ force: true });
}

sync();

app.use(express.json());
app.use(cors());

app.use("/static", express.static(path.join(__dirname, "./build/static")));



app.use("/Books", RouterBook);
app.use("/Accounts", RouterAccount);
app.use("/ReservedBooks", RouterReservedBook);
app.use("/Authorization", AuthorizationRouter);
app.use("/Authentication", AuthenticationRouter);
app.use("/Profiles", profileRouter);



app.listen(PORT, () => {
  console.log("servidor iniciou na porta " + PORT);
});
