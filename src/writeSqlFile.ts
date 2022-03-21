import { Query } from "./@types/redash";
import fs from "fs";


const writeSqlFile = (query: Query): void => {
  const data = `
  /*
  Name: ${query.name}
  Data source id: ${query.data_source_id}
  Created at: ${query.created_at.toString()}
  Last updated at: ${query.updated_at.toString()}
  Created by: ${query.user.name}
  */

  ${query.query}
  `
  fs.writeFile(`./sql/query_${query.id}.sql`, data, (err) => {
    if (err) throw err;
    console.log('正常に書き込みが完了しました');
  });
}

export default writeSqlFile