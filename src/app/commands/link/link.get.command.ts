import { LinkService } from "src/app/services/tools/link.service";
import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output, OutputType } from "../../models/output.model";

export class LinkGet extends Command {
  constructor(public link: LinkService) {
    super("get", "Lấy link rút gọn", [
      {
        name: "-n",
        description: "Tên file",
        required: true,
        validate: (d) => ""
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
        let data = await this.link.getLink(params['-n']);
        window.open(data.link, "_blank");
        resolve([
          new Output("Đã tìm thấy: " + params['-n'], "", OutputType.Success)
        ]);
      }
      catch (err) {
        reject(err);
      }
    });
  }

}
