CREATE TABLE IF NOT EXISTS packages
(
    id                              BIGSERIAL PRIMARY KEY   NOT NULL,
    uuid                            UUID                    NOT NULL,
    name                            VARCHAR(50)             NOT NULL,
    time_unit                       VARCHAR(50)             NOT NULL,
    duration                        INT                     NOT NULL,
    price                           NUMERIC                 NOT NULL,
    status                          VARCHAR(10)                     ,
    allow_change_ip                 INT                             ,
    allow_change_location           INT                             ,
    min_time_change_ip              INT                             ,
    type                            VARCHAR(10)             NOT NULL,
    location                        VARCHAR(50)                     ,
    seq                             INT                    default 1,
    created_at                      TIMESTAMP               NOT NULL,
    updated_at                      TIMESTAMP               NOT NULL
);
