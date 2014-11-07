USE `modzila`;
DROP VIEW IF EXISTS `team_path_view`;
CREATE VIEW `team_path_view` (`id`, `name`, `fullpath`) AS (
  SELECT
    `tab1`.`id`,
    `tab1`.`name`,
    `tab2`.`fullpath`
  FROM
    `team` AS `tab1`,
    `team` AS `tab2`
  WHERE
    `tab1`.`pid` = `tab2`.`id`
      AND
    `tab1`.`enable` = 1
      AND
    `tab2`.`enable` = 1
  ORDER BY
    `tab2`.`fullpath`,
    `tab1`.`name`
);
