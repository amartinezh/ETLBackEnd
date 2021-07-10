-- Table: adm.tbl_filter

-- DROP TABLE adm.tbl_filter;

CREATE TABLE adm.tbl_filter
(
    id_filter character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    rini character varying COLLATE pg_catalog."default" NOT NULL,
    rfin character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tbl_filter_pkey PRIMARY KEY (id_filter)
)

TABLESPACE pg_default;

ALTER TABLE adm.tbl_filter
    OWNER to postgres;
	
	
INSERT INTO adm.tbl_filter(	id_filter, name, rini, rfin) VALUES ('idT', 'Temperatura', '20', '50');
INSERT INTO adm.tbl_filter(	id_filter, name, rini, rfin) VALUES ('idV', 'Vibracion', '100', '150');