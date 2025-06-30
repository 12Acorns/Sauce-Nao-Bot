import { CommandEntry } from "./CommandEntry";
import * as getSauceNao from "./getSauceNao"

const map = new Map<string, CommandEntry>()
map.set(getSauceNao.getSauceCommand.name, getSauceNao.getSauceCommand)

export const commands = map