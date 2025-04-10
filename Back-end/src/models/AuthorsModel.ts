import sequelize from "../config/database";
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

class Authors extends Model<
  InferAttributes<Authors>,
  InferCreationAttributes<Authors>
> {
  declare id: CreationOptional<number>;
  declare name: string;
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
