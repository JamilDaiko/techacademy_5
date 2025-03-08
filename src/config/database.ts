import { Sequelize } from "sequelize";

const sequelize = new Sequelize("projetotec5", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
