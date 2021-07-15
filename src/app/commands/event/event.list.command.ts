import { Command } from "../../models/command.model";
import { Context } from "../../models/context.model";
import { Output } from "../../models/output.model";
import { EventCreateMeeting } from "./event.create.meeting.command";
import { EventCreateWorkshop } from "./event.create.workshop.command";

export class EventList extends Command {

  constructor() {
    super("listing", "Xem các sự kiện sắp diễn ra", [], false, "", "", []);
  }

  execute(context: Context): Promise<Output[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

}
