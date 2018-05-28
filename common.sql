create user temperature identified by 'temperature';

create database temperature;

grant all on temperature.* to temperature@'%';

use temperature;

show tables;

desc Temperatures;

select * from Temperatures;

select uuid(), now();

insert into Temperatures values ( uuid(), 12, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 13, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 14, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 15, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 16, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 17, now(), 'default', now(), now() );
insert into Temperatures values ( uuid(), 18, now(), 'default', now(), now() );

select avg(value) from Temperatures;
select max(value) from Temperatures;
select min(value) from Temperatures;

select week(now()), dayofweek(now()), dayofyear(now());

select * from temperature.Temperatures where dayofyear(datetime) = dayofyear(now());

select dayofyear(datetime), avg(value) from Temperatures where week(datetime) = week(now()) group by dayofyear(datetime);


