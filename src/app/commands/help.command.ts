import { Command } from "../models/command.model";
import { Context } from "../models/context.model";
import { Output } from "../models/output.model";

export class Help extends Command {

  constructor() {
    super("help", "Hỗ trợ người dùng", [], true, "https://image.flaticon.com/icons/png/512/906/906794.png", "", []);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      resolve([
        new Output("Đây là một số hướng dẫn cho người mới bắt đầu:"),
        new Output("- link: dịch vụ rút gọn link"),
        new Output("  + create -l <link> -n <tên dễ nhớ>: tạo tên dễ nhớ cho link"),
        new Output("  + get -n <tên dễ nhớ>: truy xuất đường dẫn từ tên dễ nhớ")
      ])
    })
  }

}
