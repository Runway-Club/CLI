import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output } from "../../models/output.model";
import { EventCreate } from "./event.create.command";
import { EventList } from "./event.list.command";

export class Event extends Command {

  constructor() {
    super("event", "Quản lý các sự kiện của club", [], false, "https://image.flaticon.com/icons/png/512/906/906794.png", "", [
      new EventList(),
      new EventCreate()
    ]);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

}
