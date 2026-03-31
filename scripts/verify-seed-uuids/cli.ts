import { z } from "zod";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const uuidSchema = z.string().uuid();
const UUID_REGEX = /'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'/gi;

const seedsDir = join(import.meta.dirname, "../../supabase/seeds");
const files = readdirSync(seedsDir).filter((f) => f.endsWith(".sql")).sort();

let totalValid = 0;
let totalInvalid = 0;
const errors: { file: string; line: number; value: string; reason: string }[] = [];

for (const file of files) {
  const content = readFileSync(join(seedsDir, file), "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match: RegExpExecArray | null;

    UUID_REGEX.lastIndex = 0;
    while ((match = UUID_REGEX.exec(line)) !== null) {
      const value = match[1];
      const result = uuidSchema.safeParse(value);
      if (result.success) {
        totalValid++;
      } else {
        totalInvalid++;
        errors.push({
          file,
          line: i + 1,
          value,
          reason: result.error.issues[0].message,
        });
      }
    }
  }
}

console.log(`\nResults across ${files.length} seed files:`);
console.log(`  Valid UUIDs  : ${totalValid}`);
console.log(`  Invalid UUIDs: ${totalInvalid}`);

if (errors.length === 0) {
  console.log("\nAll UUIDs are valid.");
} else {
  console.log("\nInvalid UUIDs:\n");
  for (const e of errors) {
    console.log(`  ${e.file}:${e.line}  "${e.value}"  → ${e.reason}`);
  }
  process.exit(1);
}
