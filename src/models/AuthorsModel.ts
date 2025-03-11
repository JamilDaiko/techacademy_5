import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class AuthorsModel extends Model {
  id: number | undefined;
  name: string | undefined;
  biography: string | undefined;
}

AuthorsModel.init(
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
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AuthorsModel",
    tableName: "authors",
  }
);

export default AuthorsModel;
