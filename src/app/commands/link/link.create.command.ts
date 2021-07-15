import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output, OutputType } from "src/app/models/output.model";
import { LinkService } from "../../services/tools/link.service";

export class LinkCreate extends Command {
  constructor(public link: LinkService) {
    super("create", "Tạo link mới", [
      {
        name: "-l",
        description: "Link cần rút gọn",
        required: true,
        validate: (data) => { return "" }
      },
      {
        name: "-n",
        description: "Tên cần gán cho link",
        required: true,
        validate: (data) => {
          if (data.length != 0) {
            return "";
          }
          return "Tên không được rỗng"
        }
      }
    ], true, "", "link", []);
  }
  execute(context: Context): Promise<Output[]> {
    return new Promise(async (resolve, reject) => {
      let params = this.parseParams(context);
      let error = this.validate(params);
      if (error != "") {
        resolve([
          ...this.describe(),
          new Output(error, "", OutputType.Error)
        ]);
        return;
      }
      try {
        await this.link.createLink({
          link: params['-l'],
          name: params['-n']
        })
        resolve([
          new Output("Đã tạo thành công: " + params['-n'], "", OutputType.Success)
        ]);
      }
      catch (err) {
        reject(err);
      }

    })

  }

}
