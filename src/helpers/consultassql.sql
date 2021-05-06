

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


/* INTERVENCIONES POR SECCIÓNES Y SEMANAS, 22 ÚLTIMOS DÍAS*/
SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY sections.name, WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* TOTAL INTERVENCIONES EN ALMACEN ÚLTIMOS 22 DÍAS AGRUPADO EN SEMANAS, CAMBIAR SECCIÓN PARA OBTENER OTRAS */
SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() AND sections.name = 'Almacén' GROUP BY "total", WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* OBTENER NUMERO SEMANAS DE HOY A 22 DÍAS ATRÁS*/
SELECT WEEKOFYEAR(events.start) AS "week" FROM events INNER JOIN sections ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC

/* TOTAL TIPO DE ORDEN, ÚLTIMOS 7 DÍAS' */
SELECT count(types.name) as "total", types.name FROM `events` INNER JOIN `types` ON types.id = events.orderType WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY types.name

/* TOTAL INTERVENCIONES POR SEMANA */
SELECT WEEK(events.start) AS "week", COUNT(*) AS "count" FROM `events` WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC

/* TOTAL TIEMPO EN AVERÍAS POR SEMANA */
SELECT WEEK(events.start) AS "week", SUM(events.totalMins) AS "totalMins" FROM `events` WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC

/* TOTAL AVERÍAS TÉCNICO, ÚLTIMOS 7 DÍAS */
SELECT count(*) as "total", technicians.name FROM `events` INNER JOIN `technicians` ON technicians.id = events.technician WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY technicians.name





/* OBTENER CUENTA SEMANA 18 de Almacén */
SELECT COUNT(*) FROM events INNER JOIN sections ON sections.id = events.section WHERE WEEK(events.start) = 18 AND sections.name = "Almacén" GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC