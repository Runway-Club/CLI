import { ConfessService } from "src/app/services/tools/confess.service";
import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output, OutputType } from "../../models/output.model";

export class ConfessPost extends Command {

  constructor(public confess: ConfessService) {
    super("post", "Tạo bài viết mới", [
      {
        name: "-c",
        description: "Nội dung bài viết",
        required: true,
        validate: (data) => {
          if (data.length < 10) {
            return "Nội dung cần có nhiều hơn 10 ký tự";
          }
          return "";
        }
      }
    ], false, "https://image.flaticon.com/icons/png/512/67/67487.png", "", []);
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
        await this.confess.create(params['-c']);
        resolve([new Output("Lời thú tội của bạn đã được ghi nhận", "", OutputType.Success)]);
      }
      catch {
        reject("Lời thú tội chưa được ghi nhận");
      }
    })

  }

}
