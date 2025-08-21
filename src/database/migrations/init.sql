CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    datePosted TIMESTAMP NOT NULL,
    UNIQUE(title, company, datePosted)
);

CREATE TABLE searches (
    id SERIAL PRIMARY KEY,
    query VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scraping_targets (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    lastScraped TIMESTAMP
);