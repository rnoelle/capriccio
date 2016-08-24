SELECT * FROM works
  WHERE id IN (SELECT work_id FROM purchase_lines
     WHERE order_id IN (SELECT id FROM purchases WHERE user_id = $1));
