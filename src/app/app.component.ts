import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Help } from './commands/help.command';
import { Link } from './commands/link/link.command';
import { Command } from './models/command.model';
import { CLIService } from './services/cli.service';
import { Output, OutputType } from './models/output.model';
import { Login } from './commands/login.command';
import { Event } from './commands/event/event.command';
import { AuthService } from './services/auth.service';
import { LinkService } from './services/tools/link.service';
import { ConfessService } from './services/tools/confess.service';
import { Confess } from './commands/confess/confess.command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'RunwayCLI';
  commands: Command[] = [];
  cmdText = "";
  command: Command | null = null;
  outputs: Output[] = [];
  prompt = "";

  constructor(
    public cli: CLIService,
    public toast: NbToastrService,
    public auth: AuthService,
    public linkService: LinkService,
    public confessService: ConfessService) {
    this.commands = this.getCommands();
    this.cli.onSuggestion = this.onSuggestion.bind(this);
    this.cli.onError = this.onError.bind(this);
  }
  ngOnInit(): void {
    console.log(this.getCommands());

  }

  public onSuggestion(commands: Command[]) {
    this.commands.length = 0;
    for (let i = 0; i < commands.length; i++) {
      this.commands.push(commands[i]);
    }
    console.log(this.commands);
  }

  public onError(err: string) {
    this.toast.danger(err, "Lỗi", { duration: 5000 });
  }

  public onCLIData(cmd: string) {
    console.log(cmd);
    this.cmdText = cmd;
  }

  public getCommands(): Command[] {
    return [
      new Login(this.auth),
      new Event(),
      new Help(),
      new Link(this.linkService),
      new Confess(this.confessService)
    ];
  }

  public onCLIKeydown(event: any) {
    if (this.cmdText == "") {
      this.onSuggestion(this.getCommands());
    }
    if (event == " ") {
      this.command = this.cli.parse(this.cmdText, this.getCommands());
      if (this.command != null && this.command.children.length == 0) {
        this.onSuggestion([this.command]);
      }
    }
    else if (event == "Enter") {
      this.cli.parse(this.cmdText, this.getCommands())?.execute(this.cli.currentContext).then((outputs) => {
        if (outputs != null) {
          this.outputs.push(...outputs);
        }
        this.prompt = this.cli.currentContext.email;
      }).catch(err => {
        this.outputs.push(new Output(err, "", OutputType.Error));
      });

    }
  }


  //   {
  //     name: "help",
  //     description: "Hỗ trợ",
  //     available: false,
  //     icon: ,
  //     parentCommand: "",
  //     children: []
  //   },
  //   {
  //     name: "login",
  //     description: "Đăng nhập",
  //     available: true,
  //     icon: "https://image.flaticon.com/icons/png/512/1828/1828503.png",
  //     parentCommand: "",
  //     children: []
  //   },
  //   {
  //     name: "about",
  //     description: "Thông tin tác giả",
  //     available: true,
  //     icon: "https://image.flaticon.com/icons/png/512/157/157933.png",
  //     parentCommand: "",
  //     children: []
  //   },
  //   {
  //     name: "mail",
  //     description: "Dịch vụ gửi mail",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/646/646135.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "event",
  //     description: "Theo dõi các sự kiện",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/840/840014.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "drive",
  //     description: "Dịch vụ lưu trữ",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/493/493944.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "course",
  //     description: "Quản lý các khóa học",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/4762/4762232.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "job",
  //     description: "Bạn muốn tìm việc",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/4762/4762232.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "qa",
  //     description: "Giải đáp thắc mắc",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/1271/1271366.png",
  //     parentCommand: "",
  //     children: []
  //   }, {
  //     name: "link",
  //     description: "Dịch vụ rút gọn link",
  //     available: false,
  //     icon: "https://image.flaticon.com/icons/png/512/1011/1011407.png",
  //     parentCommand: "",
  //     children: []
  //   },


  // ];

}
