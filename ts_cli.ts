interface FlagDefinition {
  identifier: string;
  short: string;
  long: string;
  required: boolean;
  has_value: boolean;
  value?: string;
  found?: boolean;
}

export interface flag {
	identifier: string;
	value: string;
}

export default function parseFlags(args: string[], flags: FlagDefinition[]): flag[] {
  const hits: flag[] = [];

  flags.forEach((flag) => {
    flag.found = false;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg == flag.short || arg == flag.long) {
				flag.found = true;
				const clean_flag: flag = {
					identifier: flag.identifier,
					value: ""
				};
        if (flag.has_value) {
          if (i < args.length) {
            clean_flag.value = Deno.args[i + 1];
            i++;
          } else {
						throw new Error(`Flag [${flag.identifier}] is missing a value.`);
					}
        }
        hits.push(clean_flag);
      }
    }

    if (!flag.found && flag.required) {
      throw new Error(`Missing required flag [${flag.identifier}]`);
    }
  });

  return hits;
}
