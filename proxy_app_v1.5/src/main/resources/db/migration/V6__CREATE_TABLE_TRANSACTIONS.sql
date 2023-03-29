CREATE TABLE IF NOT EXISTS transactions
(
    id                              BIGSERIAL PRIMARY KEY   NOT NULL,
    uuid                            UUID                    NOT NULL,
    customer_id                     BIGINT                  NOT NULL,
    amount                          NUMERIC                 NOT NULL,
    currency                        VARCHAR(255)            NOT NULL,
    type                            VARCHAR(10)             NOT NULL,
    status                          VARCHAR(10)             NOT NULL,
    description                     TEXT                            ,
    note                            TEXT                            ,
    reference_id                    VARCHAR(50)                     ,
    created_at                      TIMESTAMP               NOT NULL,
    updated_at                      TIMESTAMP               NOT NULL,
    UNIQUE (uuid)
);
