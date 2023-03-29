CREATE TABLE IF NOT EXISTS configurations
(
    id                              BIGSERIAL PRIMARY KEY   NOT NULL,
    uuid                            UUID                    NOT NULL,
    key                             VARCHAR(50)             NOT NULL,
    value                           VARCHAR(100)            NOT NULL,
    description                     VARCHAR(100)            NOT NULL,
    created_at                      TIMESTAMP               NOT NULL,
    updated_at                      TIMESTAMP               NOT NULL,
    UNIQUE (uuid)
);
