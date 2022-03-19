import "dotenv/config";
import fetchRedashQueries from "./fetchRedashQueries";

const main = async () => {
  const queries = await fetchRedashQueries();
  queries.map((query) => {
    console.log(query)
  })
}

void main();