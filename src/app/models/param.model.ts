export interface Param {
  name: string,
  description: string,
  required: boolean,
  validate: (data: string) => string
}
