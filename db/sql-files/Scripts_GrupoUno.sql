CREATE SEQUENCE adm.tbl_excel_id_seq;

CREATE TABLE IF NOT EXISTS adm.tbl_excel
(
    id_excel character varying NOT NULL DEFAULT nextval('tbl_excel_id_seq'),
	maquina character varying,
    temperatura character varying,
    vibracion character varying,
    hora_lectura character varying,
    fecha_archivo character varying,
	validado character varying(1) DEFAULT 0,
	observacion character varying,
    PRIMARY KEY (id_excel)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE adm.tbl_excel
    OWNER to postgres;

ALTER SEQUENCE adm.tbl_excel_id_seq
OWNED BY adm.tbl_excel.id_excel;