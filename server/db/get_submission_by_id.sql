SELECT composers.first_name AS composer_first, composers.last_name AS composer_last, submissions.*
  FROM submissions
  JOIN composers
  ON submissions.composer_id = composers.id
  WHERE submissions.id = $1;
