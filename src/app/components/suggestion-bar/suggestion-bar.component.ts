import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command.model';

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.scss']
})
export class SuggestionBarComponent implements OnInit {

  constructor() { }

  @Input()
  commands: Command[] = [];

  ngOnInit(): void {
  }

}
