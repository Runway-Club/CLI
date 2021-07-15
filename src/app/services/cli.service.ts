import { Injectable } from '@angular/core';
import { Help } from '../commands/help.command';
import { Link } from '../commands/link/link.command';
import { Command } from '../models/command.model';
import { Context } from '../models/context.model';
import { Output } from '../models/output.model';
import { cloneDeep } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CLIService {

  public currentContext: Context = {
    email: "",
    uid: "",
    project: "",
    previousCommand: "",
    params: []
  }

  //public commands: Command[] = [];

  constructor() { }

  public onSuggestion: ((suggestion: Command[]) => void) | null = null;
  public onError: ((err: string) => void) | null = null;

  public parse(cmdText: string, commands: Command[]): Command | null {
    let tokens = cmdText.split(/\s/g);
    let currentCommand = null;
    let isFound = false;
    // let commands = this.commands;
    let listOfCommands = [...commands];
    for (let i = 0; i < tokens.length; i++) {
      isFound = false;
      for (let command of listOfCommands) {
        if (command.name == tokens[i]) {
          currentCommand = command;
          isFound = true;
          listOfCommands = command.children;
          break;
        }
      }
      if (!isFound) {
        if (this.onSuggestion) {
          this.onSuggestion([...commands]);
        }
        // if (this.onError) {
        //   console.log(commands);
        //   this.onError("Không tìm thấy " + tokens[i]);
        //   return null;
        // }
      }
      if (listOfCommands.length == 0) {
        this.currentContext.params.length = 0;
        for (let j = i; j < tokens.length; j++) {
          this.currentContext.params.push(tokens[j]);
        }
        break;
      }
      else {
        if (this.onSuggestion) {
          this.onSuggestion([...listOfCommands]);
        }
      }
    }
    if (this.onSuggestion) {
      this.onSuggestion([...listOfCommands]);
    }
    console.log(currentCommand);
    console.log(this.currentContext.params);
    return currentCommand;

  }

}
