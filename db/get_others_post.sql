SELECT * from posts p JOIN users u ON p.author_id = u.id where u.id != $1 and p.title like $2
-- SELECT * from posts p JOIN users u ON p.author_id = u.id where u.id != 5 and p.title like '%test%'