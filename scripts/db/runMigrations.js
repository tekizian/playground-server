import pool from "../../src/utils/db/index.js";
import initialSeed from "../../src/utils/db/migrations/initialSeed.js";

const main = async () => {
  console.log("Connecting...");
  const client = await pool.connect();
  console.log("Connected.");

  await client.query(initialSeed);

  console.info("Finished.");

  client.release();
};

await main();
