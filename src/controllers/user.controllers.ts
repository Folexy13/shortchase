import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserController {
  constructor() {}

  public createUser = async (input: any) => {
    const { password, email, phone, username } = input;

    try {
      const isUserExist: any = await UserModel.findOne({
        $or: [{ email }, { phone }],
      });

      if (isUserExist && !isUserExist.occupation) {
        throw "A user with this credential already existed";
      }

      if (!isUserExist && (!phone || !email)) {
        throw "Either phone or email must be submitted";
      }

      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
          ...input,
          password: hashedPwd,
        });
        return newUser;
      }

      const newUser = await UserModel.create(input);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  public loginUser = async (input: any) => {
    const { password, email, phone, username } = input;

    try {
      const isUserExist: any = await UserModel.findOne({
        $or: [{ email }, { phone }, { username }],
      });

      const isValidPwd = bcrypt.compare(password, isUserExist.password);

      if (!isValidPwd || !isUserExist) {
        throw "Invalid Credentials Provided";
      }

      const payload = {
        id: isUserExist._id,
        accountType: isUserExist.accountType,
      };
      const token = jwt.sign(
        payload,
        (process.env.SECRET as string) ?? "loremipsum",
        {
          expiresIn: "4hr",
          issuer: "https://shortchase.com",
        }
      );
      return token;
    } catch (error) {
      throw error;
    }
  };

  public updateUser = async (input: any) => {
    const { id, password } = input;

    try {
      const isUserExist: any = await UserModel.findById(id);

      if (!isUserExist) {
        throw "Oops- User not found!!";
      }

      if (password) {
        //in real-life scenario, this would require a top-tier security and not through update route
        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const updatedUser = await UserModel.findByIdAndUpdate(
          id,
          { ...input, password: hashedPwd },
          { new: true, }
        );
        return updatedUser;
      }else{
       
        const updatedUser = await UserModel.findByIdAndUpdate(
          id,
          { ...input },
          { new: true,  }
        );
        return updatedUser;
      }
      
    } catch (error) {
      throw error;
    }
  };

  public deleteUser =  async (id: string) => {
    try {
      const user: any = await UserModel.findById(id);
      if(!user){
        throw "user does not exist in our system"
      }
      await UserModel.deleteOne({_id:id})
    } catch (error) {
      throw error;
    }
  };

  public getUser = async (id: string) => {
    try {
      const user: any = await UserModel.findById(id);
      if(!user){
        throw "user does not exist in our system"
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  public getAllUsers = async () => {
    try {
      const users: any = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  };
}

const userController = new UserController();

export default userController;
