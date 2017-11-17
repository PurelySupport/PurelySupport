-- $1 = diseaseid
-- $2 = name

insert into groups (
diseaseid, name
) 
values(
$1, $2
);
