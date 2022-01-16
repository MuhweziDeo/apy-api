import SQLite3 from 'sqlite3';
import { DATABASE } from '../config';

const db = new SQLite3.Database(DATABASE)