const initialSeed = `
    CREATE TABLE IF NOT EXISTS todo_items (
    id VARCHAR(20) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    text VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id, user_id)
);`;

export default initialSeed;
