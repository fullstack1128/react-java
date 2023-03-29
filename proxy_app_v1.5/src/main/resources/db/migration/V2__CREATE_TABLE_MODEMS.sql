CREATE TABLE IF NOT EXISTS modems
(
    id                              BIGSERIAL PRIMARY KEY   NOT NULL,
    uuid                            UUID                    NOT NULL,
    name                            VARCHAR(50)             NOT NULL,
    user_name                       VARCHAR(50)             NOT NULL,
    password                        VARCHAR(255)            NOT NULL,
    domain                          VARCHAR(100)            NOT NULL,
    location                        VARCHAR(50)             NOT NULL,
    type                            VARCHAR(50)             NOT NULL,
    ISP                             VARCHAR(50)             NOT NULL,
    status                          VARCHAR(20)             NOT NULL,
    created_at                      TIMESTAMP               NOT NULL,
    updated_at                      TIMESTAMP               NOT NULL,
    UNIQUE (uuid)
);
