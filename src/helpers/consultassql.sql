

/* AGRUPAR TOTAL, TIPO ACTUACIÓN, SEMANA */
SELECT count(breakdowns.name) AS 'Total', breakdowns.name, WEEKOFYEAR(events.start) AS 'Semana'
FROM events INNER JOIN breakdowns ON breakdowns.id = events.breakdown 
WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW()
GROUP BY breakdowns.name, WEEKOFYEAR(events.start)
ORDER BY WEEKOFYEAR(events.start) ASC

/* AGRUPAR TOTAL, TIPO ORDEN, SEMANA */
SELECT count(types.name) as 'Total', types.name, WEEKOFYEAR(events.start) AS 'SEMANA'
FROM events INNER JOIN types ON types.id = events.orderType 
WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW()
GROUP BY types.name, WEEKOFYEAR(events.start)
ORDER BY WEEKOFYEAR(events.start) ASC

/* AGRUPAR TOTAL POR TIPO DE ORDEN, CONTANDO 7 DÍAS ATRÁS' */
SELECT count(types.name) as "total", types.name FROM `events` INNER JOIN `types` ON types.id = events.orderType WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY types.name

/* INTERVENCIONES POR SECCIÓN, 7 ÚLTIMOS DÍAS*/
SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY sections.name, WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* SEMANAS ESTADISTICA*/
SELECT WEEKOFYEAR(events.start) AS "week" FROM events INNER JOIN sections ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* TOTAL INTERVENCIONES POR SEMANA */
SELECT WEEK(events.start), COUNT(*)
FROM events
WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW()
GROUP BY WEEK(events.start)
ORDER BY WEEK(events.start) ASC


SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() AND sections.name = 'Almacén' GROUP BY "total", WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* OBTENER CUENTA SEMANA 18 de Almacén */
SELECT COUNT(*) FROM events INNER JOIN sections ON sections.id = events.section WHERE WEEK(events.start) = 18 AND sections.name = "Almacén" GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC