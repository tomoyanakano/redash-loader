#!/usr/bin/env node

import "dotenv/config";
import { Command } from 'commander';
import { fetchQueries } from './redash/client';
import { Query } from "./@types/redash";
import writeSqlFile from "./writeSqlFile";

const program = new Command();

program
  .version('0.0.1', '-v, --version')

program
  .command('download <type>')
  .description('download Redash content')
  .requiredOption('-k, --api-key <key>', 'input your Redash API KEY')
  .requiredOption('-u, --redash-url <url>', 'input your Redash url')
  .action(async (type: string, options: {apiKey: string, redashUrl: string}): Promise<void> => {
    const apiKey = options.apiKey;
    const redashUrl = options.redashUrl;
    switch (type) {
      case 'query': {
        const queries: Query[] = await fetchQueries();
        queries.map((query: Query) => writeSqlFile(query))
        return console.log(`${queries.length} queries loaded✨`);
      }
      case 'dashboard':
        return console.log(`load ${type}が実行されました`)
      default:
        return console.log(`${type} is not found`)
    }
  })

program.parse(process.argv)