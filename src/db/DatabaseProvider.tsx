import {migrate} from 'drizzle-orm/expo-sqlite/migrator';
import {SQLiteDatabase, SQLiteProvider} from 'expo-sqlite';
import React from 'react';

import migrations from './drizzle/migrations';
import {dbDrizzle} from './DrizzleDb';
import {initializeTransactions} from './Transaction';

const DATABASE_NAME = 'bitrefill.db';

interface DatabaseProviderProps {
  children: React.ReactNode;
  onInit?: () => Promise<void>;
}

export const DatabaseProvider = ({children, onInit}: DatabaseProviderProps) => {
  const onDbInit = async (db: SQLiteDatabase) => {
    const drizzleDb = dbDrizzle.configure(db);
    await migrate(drizzleDb, migrations);
    await initializeTransactions();

    onInit?.();
  };

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{enableChangeListener: true}}
      onInit={onDbInit}>
      {children}
    </SQLiteProvider>
  );
};
