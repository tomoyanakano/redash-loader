#!/usr/bin/env node

import "dotenv/config";
import { Command } from "commander";
import { Query, Dashboard } from "./@types/redash";
import writeSqlFile from "./writeSqlFile";
import { RedashClient } from "./redash/client";

const program = new Command();

program.version("0.0.1", "-v, --version");

program
  .command("download <type>")
  .description("download Redash content")
  .requiredOption("-k, --api-key <key>", "input your Redash API KEY")
  .requiredOption("-u, --redash-url <url>", "input your Redash url")
  .action(
    async (
      type: string,
      options: { apiKey: string; redashUrl: string }
    ): Promise<void> => {
      const client = new RedashClient(options.apiKey, options.redashUrl);
      switch (type) {
        case "query": {
          const queries = await client.paginate<Query>(client.fetchQueries);
          queries.map((query: Query) => writeSqlFile(query));
          return console.log(`${queries.length} queries loaded✨`);
        }
        case "dashboard": {
          const dashboards = await client.paginate<Dashboard>(
            client.fetchDashboards
          );
          dashboards.map((dashboard: Dashboard) => console.log(dashboard.name));
          return console.log(`load ${type}が実行されました`);
        }
        default:
          return console.log(`${type} is not found`);
      }
    }
  );

program.parse(process.argv);
