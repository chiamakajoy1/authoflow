require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

require("./models");


const PORT = process.env.PORT || 5000;

async function startServer() {
    try{
        await sequelize.authenticate();
        console.log("Database Connected");

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    }
    catch(error){
        console.error("Database connection failed");
        console.error(error.message);
    }
}

startServer();