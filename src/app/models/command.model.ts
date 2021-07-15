import { Context } from "./context.model";
import { Output, OutputType } from "./output.model";
import { Param } from "./param.model";

export abstract class Command {
  constructor(
    public name: string,
    public description: string,
    public params: Param[],
    public available: boolean,
    public icon: string,
    public parentCommand: string,
    public children: Command[]) { }
  abstract execute(context: Context): Promise<Output[]>;
  parseParams(context: Context): { [key: string]: string } {
    let params: { [key: string]: string } = {};
    let textp = "";
    let currentP = "";
    for (let p of context.params) {
      if (p != "" && p[0] == "-") {
        if (p != currentP) {
          params[currentP] = textp;
          currentP = p;
          textp = "";
        }
        if (currentP == "") {
          currentP = p;
        }
        continue;
      }
      textp += " " + p;
      // if (p == "") {
      //   textp += " ";
      // }
    }
    params[currentP] = textp;
    return params;
  }

  public validate(paramsObject: { [key: string]: string }): string {
    let error = "";
    let keys = Object.keys(paramsObject);
    for (let param of this.params) {
      if (param.required && !keys.includes(param.name)) {
        return "Yêu cầu " + param.name + ": " + param.description;
      }
      error = param.validate(paramsObject[param.name]);
      if (error != "") {
        return error;
      }
    }
    return error;
  }

  public describe(): Output[] {
    return [
      new Output("Mô tả lệnh " + this.name, ""),
      new Output(this.description, "", OutputType.Warn),
      new Output("Danh sách tham số -----------------", "", OutputType.Warn),
      ...this.params.map((p, i, arr) => new Output(p.name + (p.required ? " (Bắt buộc): " : ": ") + p.description, "", OutputType.Warn)),
      new Output("-----------------------------------", "", OutputType.Warn)
    ]
  }

}

