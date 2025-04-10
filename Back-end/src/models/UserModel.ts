import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class UserModel extends Model {
  static deleteMany(arg0: {}) {
    throw new Error("Method not implemented.");
  }
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  cpf: string | undefined;

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }
}

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  validatePassword(password: string): Promise<boolean>;
}

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11], // CPF deve ter 11 caracteres
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
