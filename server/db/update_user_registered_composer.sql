UPDATE users
  SET registered_composer = true
  WHERE id = $1;
