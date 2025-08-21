import { createConnection } from 'typeorm';
import { Job } from '../models/Job';
import { Search } from '../models/Search';
import { ScrapingTarget } from '../models/ScrapingTarget';
import { config } from '../config/database';

const connection = createConnection({
    type: 'postgres', // or your preferred database type
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [Job, Search, ScrapingTarget],
    synchronize: true, // set to false in production
    logging: false,
});

export default connection;