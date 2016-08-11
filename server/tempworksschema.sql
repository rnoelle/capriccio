INSERT INTO works (title, composer_id, instrumentation, catalog,
  worknumber, year_composed, style, pdf_url, cover_url, collection,
  package, price_print, price_pdf, price_mixed, tags)
  VALUES ('Cello Concerto in A Minor', 1, ARRAY['cello', 'orchestra'],'op.', 129,
    1850, 'romantic',
    'http://hz.imslp.info/files/imglnks/usimg/b/b5/IMSLP51321-PMLP13161-Schumann_op.129_Cello_Concerto_fs_RS_14.pdf',
    'http://i.dailymail.co.uk/i/pix/2012/10/17/article-2219093-158BAA10000005DC-201_634x753.jpg',
    'classics', 'mixed', 7.49, 0.00, 7.49, ARRAY['cello solo', 'solo with orchestra']);
INSERT INTO works (title, composer_id, instrumentation, catalog,
  worknumber, year_composed, style, pdf_url, cover_url, collection,
  package, price_print, price_pdf, price_mixed, tags)
  VALUES ('Erlkonig', 2, ARRAY['tenor', 'piano'],'D.', 328,
    1815, 'romantic',
    'http://hz.imslp.info/files/imglnks/usimg/9/93/IMSLP00888-Schubert_-_Erlk__nig_Op1.pdf',
    'http://adorablekittens.com/wp-content/uploads/2015/08/cat2.jpg',
    'classics', 'mixed', 5.49, 0.00, 5.49, ARRAY['vocal', 'solo', 'solo and piano', 'lieder', 'art song', 'programmatic']);
INSERT INTO works (title, composer_id, instrumentation, catalog,
  worknumber, year_composed, style, pdf_url, cover_url, collection,
  package, price_print, price_pdf, price_mixed, tags)
  VALUES ('Der Alpenjager', 2, ARRAY['bass', 'piano'],'D.', 524,
    1817, 'romantic',
    'http://hz.imslp.info/files/imglnks/usimg/2/26/IMSLP16203-SchubertD524_Der_Alpenj__ger_2nd_version.pdf',
    'http://1000funnypictures.com/wp-content/uploads/Ugly-kitten-Funny-Cats.jpg',
    'classics', 'mixed', 5.49, 0.00, 5.49, ARRAY['vocal', 'solo', 'solo and piano']);
