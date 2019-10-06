/* eslint-disable import/prefer-default-export */
export const tables = `
CREATE TABLE
            users(
                id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                gender TEXT NOT NULL,
                job_role TEXT NOT NULL,
                department TEXT NOT NULL,
                address TEXT NOT NULL,
                is_admin BOOLEAN);
CREATE TABLE
            articles(
                article_id SERIAL PRIMARY KEY,
                created_on text NOT NULL,
                title varchar NOT NULL,
                author_id INTEGER NOT NULL,
                author_name TEXT NOT NULL,
                article varchar NOT NULL);
                
CREATE TABLE
          comments(
              comment_id  SERIAL PRIMARY KEY,
              article_id INTEGER NOT NULL, 
              author_id INTEGER NOT NULL,
              comment varchar NOT NULL,        
              FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY(article_id) REFERENCES articles(article_id) ON DELETE CASCADE);
CREATE TABLE
            flags(
                flag_id SERIAL PRIMARY KEY,
                type TEXT NOT NULL,
                flaged_id INTEGER NOT NULL,
                content varchar NOT NULL,
                reason varchar NOT NULL
);`;
