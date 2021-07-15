import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output, OutputType } from "../../models/output.model";

export class EventCreateWorkshop extends Command {

  constructor() {
    super("workshop", "Tạo buổi workshop", [
      {
        name: "-n",
        description: "Tên workshop",
        required: true,
        validate: (data) => ""
      },
      {
        name: "-l",
        description: "Link workshop online",
        required: false,
        validate: (data) => ""
      },
      {
        name: "-loc",
        description: "Địa điểm tổ chức",
        required: false,
        validate: (data) => ""
      },
      {
        name: "-t",
        description: "Thời gian tổ chức",
        required: true,
        validate: (data) => ""
      }
    ], false, "https://image.flaticon.com/icons/png/512/906/906794.png", "", []);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      let params = this.parseParams(context);
      let error = this.validate(params);
      if (error != "") {
        resolve([
          ...this.describe(),
          new Output(error, "", OutputType.Error)
        ]);
        return;
      }
      resolve([]);
    })

  }

}
