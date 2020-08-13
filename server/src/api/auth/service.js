import Workers from "../../models/Workers/index";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { getResponse, getErrorResponse } from '../mainModels.js';

import mainConfig from '../../env';

class AuthServices {

   signin = async (name, login, password, role) => {
    // let verificationCode = Math.floor(1000 + Math.random() * 9000);
    // const result = await sendVerificationCodeViaSMS(verificationCode, number);
    // const authToken = jwt.sign({ _id: admin._id, userRole: admin.userRole, deviceId: null }, mainConfig.JWT_SECRET, { expiresIn: '7d' });
    // const user = new Users({ phoneNumber: number, verificationCode: verificationCode });
    // user.save();


    
    const hashPassword =  await bcrypt.hash(password, 10);



    const worker = new Workers({name, login, password: hashPassword, role})
    worker.save();
    return getResponse(true, "successfully sign in")

    // const validPassword = bcrypt.compareSync(body.password, admin.password);
    // if (!validPassword) return getResponse(false, 'Wrong password');
    // const authToken = jwt.sign({ _id: admin._id, userRole: admin.userRole, deviceId: null }, mainConfig.JWT_SECRET, { expiresIn: '7d' });
    // return getResponse(true, 'Successfully logged in', { token: authToken, email: body.email });
  }




 login = async (login, password) => {

    const worker = await Workers.findOne({ login });
    if (!worker) {
      return getResponse(false, "worker was not founded");
    }

    const comparePassword = await bcrypt.compare(password, worker.password);

    if (!comparePassword) {
      return getResponse(false, "Incorrect password");
    }

        const authToken = jwt.sign({ _id: worker._id, userRole: worker.role, login: worker.login }, mainConfig.JWT_SECRET, { expiresIn: '7d' });

        return getResponse(true, "Worker successfuly logged in", authToken);

    // console.log(worker);

    // const findDevice = await Device.find({ deviceId }).populate('user');
    // if (!user) {
    //   return getResponse(false, "user is not found");
    // }
    // for (let i = 0; i < findDevice.length; i++) {
    //   const index = findDevice[i].user.devices.indexOf(findDevice[i].id);

    //   if (index > -1) {
    //     findDevice[i].user.devices.splice(index, 1);
    //   }
    //   findDevice[i].user.save()

    //   findDevice[i].remove();

    //   findDevice[i].save()

    }


  //   const device = new Device({ user: user.id, deviceId, osType, deviceToken });

  //   await device.save();
  //   user.devices.push(device._id);
  //   await user.save();
  //   let token = jwt.sign({ _id: user._id, deviceId: device._id, role: roleEnum.user },
  //     mainConfig.JWT_SECRET,
  //     {
  //       expiresIn: '24h'
  //     }
  //   );
    // return getResponse(true, "verification code is valid", token);
  // }

  loginAdmin = async (adminEmail, adminPassword) => {
    const findAdmin = await admin.findOne({ email: adminEmail });
    if (!findAdmin) {
      return getResponse(false, "admin was not founded");
    }
    const comparePassword = await bcrypt.compare(adminPassword, findAdmin.password);
    if (!comparePassword) {
      return getResponse(false, "Incorrect password");
    }
    let token = await jwt.sign({ _id: findAdmin._id, role: roleEnum.admin },
      mainConfig.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    return getResponse(true, "Admin successfuly logged in", token);
  }



  //  await bcrypt.hash(adminPassword, 10, (err: any, hash: any) => {
  // const createAdminn = new admin({email: adminEmail, password: hash});
  // createAdminn.save();
  // });
  // const admin = await Users.findOne({ email: email });
  // if (!admin) {
  //   return getResponse(false, "No administrator was found");
  // }
  // let token = jwt.sign({ email: email },
  //   mainConfig.JWT_SECRET,
  //   {
  //     expiresIn: '24h'
  //   }
  // );
  // return getResponse(true, "admin was found", token);

}









//   public changePassword = async(admin: IAdmin, body: IChangePasswordBody): Promise<IResponseModel> => {
//     const validPassword = bcrypt.compareSync(body.oldPassword, admin.password);
//     if (!validPassword) {
//       return getResponse(false, 'Wrong oldPassword');
//     }
//     const hashedPassword = bcrypt.hashSync(body.newPassword, 12);
//     admin.password = hashedPassword;
//     await admin.save();
//     return getResponse(true, 'Password updated');
//   }

//   public sendSms = async(body: ISendSmsBody): Promise<IResponseModel> => {
//     const verificationKey = this.generateRandom('00123456789', 4);
//     await this.createOrUpdateUser(body.phoneNumber, verificationKey);
//     const message = `Your verification code for Paradox - ${verificationKey}. You can now enter in your account`;
//     sendVerificationCodeViaSMS(message, body.phoneNumber).catch(e => console.log(e));
//     return getResponse(true, 'Sms sent', verificationKey);
//   }

//   public verify = async(user: IUser, body: IVerifyBody): Promise<IResponseModel> => {
//     const verificationPassed = bcrypt.compareSync(body.verificationKey, user.verificationKey);
//     if (!verificationPassed) return getResponse(false, 'Wrong verification key');
//     await UserSchema.updateMany({ _id: { $ne: user._id}, deviceId: body.deviceId }, { deviceId: null, deviceToken: null });
//     user.isVerified = true;
//     user.deviceId = body.deviceId;
//     if (body.deviceToken) user.deviceToken = body.deviceToken;
//     user.osType = body.osType;
//     user.language = body.language || LanguageEnum.hy;
//     // if (!user.card) {
//     //   const userCard = new UserCardSchema({
//     //     user: user._id,
//     //   });
//     //   user.card = userCard._id;
//     //   await Promise.all([
//     //     await user.save(),
//     //     await userCard.save()
//     //   ]);
//     // } else {
//     //   await user.save();
//     // }
//     await user.save();
//     const authToken = jwt.sign({ _id: user._id, deviceId: user.deviceId, userRole: UserRoleEnum.user }, mainConfig.JWT_SECRET, { expiresIn: '25d' });
//     return getResponse(true, 'Logged in successfully', authToken);
//   }

//   public logout = async(user: IUser): Promise<IResponseModel> => {
//     user.deviceId = null;
//     user.deviceToken = null;
//     return getResponse(true, 'Logged out');
//   }

//   private generateRandom(charset: string, length: number) {
//     let text = '';
//     for (let i = 0; i < length; i++) {
//       const char = charset.charAt(Math.ceil(Math.random() * (charset.length - 1)));
//       text += char;
//     }
//     return text;
//   }

//   private async createOrUpdateUser(phoneNumber: string, verificationKey: string) {
//     const hashedCode = bcrypt.hashSync(verificationKey, 12);
//     const user = await UserSchema.findOneAndUpdate({ phoneNumber }, { verificationKey: hashedCode });
//     if (!user) {
//       // const nid = await this.getUserNid();
//       await UserSchema.create({
//         // nid,
//         phoneNumber,
//         verificationKey: hashedCode,
//       });
//     }
//   }

//   private async getUserNid(): Promise<number> {
//     let count = await UserSchema.countDocuments();
//     return ++count;
//   }



export default new AuthServices();