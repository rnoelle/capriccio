INSERT INTO submissions (date_submitted, title, composerfirst, composerlast,
  cover_url, score_url, parts_url, template, price_print, price_pdf, price_mixed,
  package, accepted, date_accepted)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
