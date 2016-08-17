SELECT * FROM users
  WHERE id IN
  (SELECT id FROM facebooks
    WHERE key = $1);
