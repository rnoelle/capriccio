SELECT composers.first_name AS composer_first, composers.last_name AS composer_last, works.* FROM works
  JOIN composers
  ON works.composer_id = composers.id
  WHERE works.id = $1;
