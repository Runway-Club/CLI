import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cli-bar',
  templateUrl: './cli-bar.component.html',
  styleUrls: ['./cli-bar.component.scss']
})
export class CliBarComponent implements OnInit {

  constructor() { }

  @Input()
  prompt = "";

  cmdText = "";

  @Output()
  keyDown: EventEmitter<any> = new EventEmitter();

  @Output()
  cmd: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  onKeydown(event: any) {
    this.keyDown.emit(event.key);
    this.cmd.emit(this.cmdText);
  }

  isMobile(): boolean {
    return window.screen.width < 500;
  }

}
