import type { CollectionStorageDescriptor } from 'astro';

export type SqliteConfig = {
	/**
	 * The URL of the database: `file:` followed by a path for a local SQLite file, for example
	 * `file:.astro/collections.db`, or the `libsql://` or `https://` URL of a remote database
	 * such as Turso. Relative paths start from the directory where Astro runs.
	 */
	url: string;
	/**
	 * The name of the environment variable that holds the auth token of a remote database.
	 * The driver reads it when it starts, so the token is never written into your build.
	 */
	authTokenEnv?: string;
};

/**
 * Keeps a collection's entries in a SQLite or libSQL database. Pass the result to the
 * `storage` option of `defineCollection()`.
 */
export function sqlite(config: SqliteConfig): CollectionStorageDescriptor<SqliteConfig> {
	return {
		// A package specifier, unlike a file path, lets the server build import the driver from
		// node_modules instead of bundling it (see `astro.external` in package.json), so libSQL
		// resolves its native binding from its own dependencies.
		entrypoint: '@astrojs/collection-storage-sqlite/driver',
		config: { ...config },
	};
}
