/* eslint-disable import/prefer-default-export */
export const data = `
INSERT INTO 
            users(first_name, last_name, email, password, gender, job_role, department, address, is_admin) 
            VALUES
            ('NIYONSENGA','ERIC', 'niyeric11@gmail.com','$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu','MALE','HOD','IT',' KACYIRU', true), 
            ('BYUSA','PRINCE DACY', 'byusa@gmail.com','$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu','MALE','Employee','FINANCE',' UMUSAVE', false),
            ('SARPONG','BENITH', 'sarpong@gmail.com','$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu','MALE','Employee','FINANCE',' UMUSAVE', false );

INSERT INTO
            articles(created_on, title, author_id, author_name, article) 
            VALUES
            ('2019-09-11T10:32:32+02:00','Identity-based habits', 2,'BYUSA PRINCE DACY','One of the central ideas in the book is the concept of building “identity-based habits”, which essentially recommends focusing on the type of person you wish to become rather than the outcome you wish to achieve. One reader named Roland used the idea to improve his eating habits. “I stopped eating unhealthy food via identity change,” he wrote. “I tried many times in the past, but it became easy — natural — only after I had made the conscious decision that I want to be someone who eats healthy. Instead of aiming for I want to stop eating bad food, I tried changing the mindset to I am someone that eats healthy and lives a healthy life. It changes how you approach things.'),

            ('2019-04-12T23:51:56+02:00','Growth Mindset', 3,'SARPONG BENITH',' I can’t do it, I can’t learn this, it is too hard, Come on, I’m just a Junior Developer, WebPack is not my thing, I tried it and failed.Those are the words of a developer drenched and soaked with imposter syndrome.Over time we keep fighting ourselves, trying to run away from our shadows, trying to find shortcuts, yes I did also, I really did: (At a point in my life, I just felt some things were not meant for me, I felt maths was too complex for me, JavaScript was not my thing!! '); 

INSERT INTO
            comments(article_id, author_id, comment) 
            VALUES
            (1,2, 'interesting '), 
            (1,3, 'nice topic'); 

INSERT INTO
            flags(type, flaged_id, content, reason) 
            VALUES
            ('comment',2, 'nice topic', 'embarassing'), 
            ('article',2, 'It can’t be like that', 'lies'); 
            

`;
