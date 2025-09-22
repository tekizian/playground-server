import initialSeed from "./initialSeed.js";

const runMigrations = async () => {
  const migrations = [initialSeed];
  for (const migration of migrations) {
    await migration();
  }
};

export default runMigrations;
