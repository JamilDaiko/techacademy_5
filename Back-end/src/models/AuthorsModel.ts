import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class Authors extends Model {
  id: number | undefined;
  name: string | undefined;
}

Authors.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Authors",
    tableName: "authors",
  }
);

export default Authors;
