import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

export interface HighlightSelection {
  keyword: string,
  color: string,
  background: string,
  type: string,
  description: string
}

export interface ConsoleChar {
  char: string,
  type: string,
  background: string,
  color: string,
  borderRadius: string,
  description: string,
}

@Component({
  selector: 'app-neo-clibar',
  templateUrl: './neo-clibar.component.html',
  styleUrls: ['./neo-clibar.component.scss']
})
export class NeoCLIBarComponent implements OnInit {

  constructor() { }

  @Input()
  text: string = "Lorem ipsum";

  @Output()
  textChange: EventEmitter<string> = new EventEmitter();

  @Input()
  cursorLoc: number = 0;


  @Input()
  highlights: HighlightSelection[] = [
    {
      keyword: 'runway',
      color: 'yellow',
      background: 'black',
      type: 'none',
      description: ""
    }, {
      keyword: 'confess',
      color: 'green',
      background: 'white',
      type: 'border',
      description: "Dịch vụ thú tội"
    }
  ]

  scrollPosition = 0;

  specialKeys = ['Backspace', 'Delete', 'Shift', 'Control', 'Enter'];

  ngOnInit(): void {
    this.cursorLoc = this.text.length - 1;
  }

  public onKeypress(event: any) {
    if (!this.specialKeys.includes(event.key)) {
      this.text += event.key
      this.cursorLoc++;
      this.scrollPosition = 9999;
    }
  }

  public onKeyup(event: any) {
    console.log(event.key);
    if (event.key == "Enter") {

    }
    else if (event.key == "Backspace") {
      this.text = this.text.substring(0, this.cursorLoc) + this.text.substring(this.cursorLoc + 1, this.text.length);
      this.cursorLoc = this.cursorLoc > 0 ? this.cursorLoc - 1 : 0;
    }
    else if (event.key == "ArrowLeft") {
      this.cursorLoc = this.cursorLoc > 0 ? this.cursorLoc - 1 : 0;
    }
    else if (event.key == "ArrowRight") {
      this.cursorLoc = this.cursorLoc < this.text.length - 1 ? this.cursorLoc + 1 : this.text.length - 1;
    }
  }

  public getCharacters(): ConsoleChar[] {
    let r: ConsoleChar[] = [];
    for (let c of this.text) {
      r.push({
        char: c,
        background: 'black',
        color: 'white',
        type: 'normal',
        borderRadius: '0 0 0 0',
        description: ''
      });
    }
    this.highlighting(r);
    return r;
  }

  public highlighting(chars: ConsoleChar[]) {
    for (let hightlight of this.highlights) {

      let matchers = this.text.matchAll(new RegExp(hightlight.keyword, 'g'));

      if (matchers != null) {

        for (let match of matchers) {
          if (match.index == undefined) {
            continue;
          }
          for (let i = 0; i < hightlight.keyword.length; i++) {
            chars[match.index + i].color = hightlight.color;
            chars[match.index + i].background = hightlight.background;
          }

          if (hightlight.type == 'border') {
            chars[match.index].borderRadius = '20px 0 0 20px';
            chars[match.index + hightlight.keyword.length - 1].borderRadius = '0 20px 20px 0';
          }
          if (hightlight.description != '') {
            chars[match.index].description = hightlight.description;
          }
        }
      }

    }
  }

}
