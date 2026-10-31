import {readFileSync} from 'node:fs';
import {plan} from './plan.js';
try {
  if (process.argv.length!==4) throw new Error('Usage: node cli.js tasks.json YYYY-MM-DD');
  console.log(JSON.stringify(plan(JSON.parse(readFileSync(process.argv[2],'utf8')),process.argv[3]),null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
