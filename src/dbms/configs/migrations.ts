export type Migration = {
	name: string;
	sql: string;
};

export const migrations: Migration[] = [
	{
		name: "100000000000000_add_databases_table.ts",
		sql: `
      create table if not exists databases
      (
        id                    TEXT                                not null
          primary key
          unique,
        created_at            TIMESTAMP default CURRENT_TIMESTAMP not null,
        updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null
      );

      CREATE TRIGGER IF NOT EXISTS databases_updated_at AFTER UPDATE ON databases
      BEGIN
      UPDATE databases
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.id;
      END;`,
	},
];
