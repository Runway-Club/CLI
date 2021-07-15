import { LinkService } from "src/app/services/tools/link.service";
import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output } from "../../models/output.model";
import { LinkCreate } from "./link.create.command";
import { LinkGet } from "./link.get.command";

export class Link extends Command {
  constructor(public link: LinkService) {
    super("link", "Dịch vụ rút gọn link", [], true, "https://image.flaticon.com/icons/png/512/1011/1011407.png", "", [
      new LinkCreate(link),
      new LinkGet(link)
    ]);
  }
  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
