CREATE TABLE IF NOT EXISTS refresh_tokens
(
    id                                      BIGSERIAL PRIMARY KEY NOT NULL,
    refresh_token                           VARCHAR(1000)          NOT NULL,
    user_id                                 BIGINT                NOT NULL,
    created_at                              TIMESTAMP             NOT NULL,
    UNIQUE (refresh_token)
);
