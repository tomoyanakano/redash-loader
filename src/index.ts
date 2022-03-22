#!/usr/bin/env node

import "dotenv/config";
import { Command } from "commander";
import { Query, Dashboard } from "./@types/redash";
import { RedashClient } from "./redash/client";
import { writeFile, writeSqlFile } from "./writeFile";
import makeDir from "make-dir";

const loadQuery = async (client: RedashClient) => {
  const queries = await client.paginate<Query>(client.fetchQueries);
  queries.map(async (query: Query) => {
    await makeDir(`./query/query_${query.id}`);
    writeSqlFile(query);
    writeFile(
      `./query/query_${query.id}/query_${query.id}.json`,
      JSON.stringify(query)
    );
  });
  return console.log(`${queries.length} queries loaded✨`);
};

const loadDashboard = async (client: RedashClient) => {
  const dashboards = await client.paginate<Dashboard>(client.fetchDashboards);
  dashboards.map(async (dashboard: Dashboard) => {
    await makeDir(`./dashboard/dashboard_${dashboard.id}`);
    writeFile(
      `./dashboard/dashboard_${dashboard.id}/dashboard_${dashboard.id}.json`,
      JSON.stringify(dashboard)
    );
  });
  return console.log(`${dashboards.length} dashboards loaded✨`);
};

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
        case "query":
          return await loadQuery(client);
        case "dashboard":
          return await loadDashboard(client);
        default:
          return console.log(`${type} is not found`);
      }
    }
  );

program.parse(process.argv);
