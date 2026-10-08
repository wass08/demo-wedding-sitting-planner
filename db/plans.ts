import { neon } from "@neondatabase/serverless";

// A small D1-shaped adapter over Neon Postgres so the route handlers keep their
// SQL as written: `?` placeholders become `$1, $2, …` and batches run in a transaction.
type Sql = ReturnType<typeof neon<false, true>>;
let client: Sql | undefined;

function sql(): Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw Error("Wedding storage unavailable");
  return (client ??= neon(url, { fullResults: true }));
}

const toPostgres = (query: string) => {
  let i = 0;
  return query.replace(/\?/g, () => `$${++i}`);
};

class Statement {
  constructor(readonly text: string, readonly params: unknown[] = []) {}
  bind(...params: unknown[]) {
    return new Statement(this.text, params);
  }
  query(db: Sql) {
    return db.query(this.text, this.params);
  }
  async first<T = Record<string, unknown>>(): Promise<T | null> {
    return ((await this.query(sql())).rows[0] as T | undefined) ?? null;
  }
  async all<T = Record<string, unknown>>(): Promise<{ results: T[] }> {
    return { results: (await this.query(sql())).rows as T[] };
  }
  async run() {
    return { meta: { changes: (await this.query(sql())).rowCount ?? 0 } };
  }
}

export function plansDb() {
  const db = sql();
  return {
    prepare: (query: string) => new Statement(toPostgres(query)),
    async batch(statements: Statement[]) {
      const results = await db.transaction(statements.map((s) => s.query(db)));
      return results.map((r) => ({ meta: { changes: r.rowCount ?? 0 } }));
    },
  };
}
