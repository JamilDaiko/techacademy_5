import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Categories extends Model<
  InferAttributes<Categories>,
  InferCreationAttributes<Categories>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Categories.init(
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
    modelName: "CategoriesModel",
    tableName: "categories",
  }
);

export default Categories;
