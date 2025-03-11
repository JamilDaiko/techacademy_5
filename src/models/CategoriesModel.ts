import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class CategoriesModel extends Model {
  id: number | undefined;
  categoria: string | undefined;
}

CategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CategoriesModel",
    tableName: "categories",
  }
);

export default CategoriesModel;
