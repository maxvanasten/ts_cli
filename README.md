# ts_cli

ts_cli is a tiny helper library for parsing simple command line arguments. ts_cli was written with Deno in mind.

## Usage

```ts
import parseFlags, { flag } from "https://github.com/maxvanasten/ts_cli/ts_cli.ts";

const flags: flag[] = parseFlags(Deno.args, [
	{
		identifier: "name",
		short: "-n",
		long: "--name",
		required: true,
		has_value: true
	},
	{
		identifier: "age",
		short: "-a",
		long: "--age",
		required: true,
		has_value: true
	}
]);

const name = flags.find(flag => flag.identifier == "name")?.value;
const age = flags.find(flag => flag.identifier == "age")?.value;

console.log(`Your name is ${name}, you are ${age} years old.`);
```
