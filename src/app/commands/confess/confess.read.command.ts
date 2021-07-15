import { ConfessService } from "src/app/services/tools/confess.service";
import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output, OutputType } from "../../models/output.model";

export class ConfessRead extends Command {

  constructor(public confess: ConfessService) {
    super("read", "Đọc các lời thú tội", [], false, "https://image.flaticon.com/icons/png/512/67/67487.png", "", []);
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
        let confessions = await this.confess.read();
        let outputs = [new Output("Những lời thú tội:")];
        for (let confess of confessions) {
          outputs.push(new Output("---------------------------------------"));
          outputs.push(new Output("#" + confess.time, "", OutputType.Warn));
          outputs.push(new Output("Tgian: " + (new Date(confess.time)).toLocaleString()));
          outputs.push(new Output(confess.content));
          outputs.push(new Output("---------------------------------------"));
        }
        resolve(outputs);
      }
      catch {
        reject("Không đọc được những lời thú tội");
      }
    })

  }

}
