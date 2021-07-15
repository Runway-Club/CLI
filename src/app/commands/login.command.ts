import { Command } from "../models/command.model";
import { Context } from "../models/context.model";
import { Output, OutputType } from "../models/output.model";
import { AuthService } from "../services/auth.service";

export class Login extends Command {

  constructor(private auth: AuthService) {
    super("login", "Đăng nhập", [], true, "https://image.flaticon.com/icons/png/512/1828/1828503.png", "", []);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.auth.loginWithGoogle();
        resolve([
          new Output("Đăng nhập thành công")
        ])
      }
      catch {
        reject("Đăng nhập thất bại")
      }
    });
  }

}
