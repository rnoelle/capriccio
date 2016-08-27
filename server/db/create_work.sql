INSERT INTO works
  (title, composer_id, instrumentation, catalog,
    worknumber, year_composed, style, score_url,
    cover_url, collection, package, price_print,
    price_pdf, price_mixed, parts_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,
    $10, $11, $12, $13, $14, $15);
