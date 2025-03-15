import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class CategoriesModel extends Model {
  static findByIdAndUpdate(id: string, body: any, arg2: { new: boolean }) {
    throw new Error("Method not implemented.");
  }
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
