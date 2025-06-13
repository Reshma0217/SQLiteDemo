import { Alert } from 'react-native';
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const initDB = async () => {
  const db = await openDatabase({ name: 'StudentDB.db', location: 'default' });
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rollno TEXT UNIQUE NOT NULL,
      grade TEXT
    );
  `);
  return db;
};
