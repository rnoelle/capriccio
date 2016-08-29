SELECT * FROM reviews
  JOIN users
  ON reviews.user_id = users.id
  WHERE product_id = $1;
