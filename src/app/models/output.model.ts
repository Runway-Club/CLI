export enum OutputType {
  Info,
  Warn,
  Error,
  Success
}
export class Output {
  constructor(public text: string, public image = "", public type = OutputType.Info) { }
  public get typeText(): string {
    switch (this.type) {
      case OutputType.Error:
        return "Error"
      case OutputType.Info:
        return "Info"
      case OutputType.Success:
        return "Success"
      case OutputType.Warn:
        return "Warn"
    }
  }
}
