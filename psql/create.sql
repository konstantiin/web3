create table checks(
    check_id serial primary key,
    session_id text not null,
    x double precision not null ,
    y double precision not null ,
    r double precision not null
);
