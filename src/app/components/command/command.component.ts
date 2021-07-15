import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command.model';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  constructor() { }

  @Input()
  public command: Command | null = null;

  ngOnInit(): void {
  }

}
