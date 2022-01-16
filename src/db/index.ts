import SQLite3 from 'sqlite3';
SQLite3.verbose();
import { DATABASE } from '../config';

const db = new SQLite3.Database(DATABASE);

export const createCalculationsTable = () => {
    return new Promise((resolve, reject) => {
        db.run(
            `CREATE TABLE IF NOT EXISTS calculations(id INTEGER PRIMARY KEY AUTOINCREMENT, customerId INTEGER, yearlyCompoundTimes INTEGER, interestRate REAL, deposit REAL, apy REAL, total REAL, 
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`,
            (err) => {
                console.log('error');
                if (err) {
                    reject(err);
                } else {
                    console.log('created table');
                    resolve('created table');
                }
            }
        );
    });
};

export default db;
