import { ConfessService } from "src/app/services/tools/confess.service";
import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output } from "../../models/output.model";
import { ConfessPost } from "./confess.post.command";
import { ConfessRead } from "./confess.read.command";

export class Confess extends Command {

  constructor(public confess: ConfessService) {
    super("confess", "Chia sẻ Confession", [], false, "https://image.flaticon.com/icons/png/512/67/67487.png", "", [
      new ConfessPost(confess),
      new ConfessRead(confess)
    ]);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

}
