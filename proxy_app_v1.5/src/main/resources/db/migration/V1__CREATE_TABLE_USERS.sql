CREATE TABLE IF NOT EXISTS users
(
    id                              BIGSERIAL PRIMARY KEY   NOT NULL,
    uuid                            UUID                    NOT NULL,
    user_name                       VARCHAR(50)             NOT NULL,
    name                            VARCHAR(100)            NOT NULL,
    email                           VARCHAR(50)             NOT NULL,
    password                        VARCHAR(255)            NOT NULL,
    phone_number                    VARCHAR(30)                     ,
    role                            VARCHAR(10)             NOT NULL,
    balance                         NUMERIC                 NOT NULL,
    created_at                      TIMESTAMP               NOT NULL,
    updated_at                      TIMESTAMP               NOT NULL,
    status                          VARCHAR(10)             NOT NULL,
    UNIQUE (uuid)
);
