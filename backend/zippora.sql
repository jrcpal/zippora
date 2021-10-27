\echo 'Delete and recreate zippora db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE zippora;
CREATE DATABASE zippora;
\connect zippora

\i zippora-schema.sql
\i zippora-seed.sql