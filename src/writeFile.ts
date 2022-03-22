import { Query } from "./@types/redash";
import * as fs from "fs";

export const writeSqlFile = (query: Query): void => {
  const data = `
  /*
  Name: ${query.name}
  Data source id: ${query.data_source_id}
  Created at: ${query.created_at.toString()}
  Last updated at: ${query.updated_at.toString()}
  Created by: ${query.user.name}
  */

  ${query.query}
  `;
  writeFile(`./query/query_${query.id}/query_${query.id}.sql`, data);
};

export const writeFile = (filePath: string, data: string) => {
  return fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
  });
};
