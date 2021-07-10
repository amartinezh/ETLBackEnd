-- PROCEDURE: adm.validar_rangos()

-- DROP PROCEDURE adm.validar_rangos();

CREATE OR REPLACE PROCEDURE adm.validar_rangos(
	)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	

	declare contador int; 
	declare i int:=0;
	declare temperaturaTemp varchar;
	declare riniTemp varchar = (select rini from adm.tbl_filter where id_filter = 'idT');
	declare rfinTemp varchar = (select rfin from adm.tbl_filter where id_filter = 'idT');
	declare vibracionTemp varchar;
	declare riniVib varchar = (select rini from adm.tbl_filter where id_filter = 'idV');
	declare rfinVib varchar = (select rfin from adm.tbl_filter where id_filter = 'idV');
	declare idTemp varchar;

BEGIN

	CREATE TEMP TABLE tmp_excel AS 
	select * from adm.tbl_excel where validado = '0';
	
	contador := (select count(*) from tmp_excel);
	

	while i < contador   LOOP
	
		temperaturaTemp := (select temperatura from tmp_excel order by id_excel limit 1);
		vibracionTemp := (select vibracion from tmp_excel order by id_excel limit 1);
		idTemp := (select id_excel from tmp_excel order by id_excel limit 1);
		
		if (temperaturaTemp >= riniTemp) AND (temperaturaTemp <= rfinTemp) then	

			if (vibracionTemp >= riniVib) AND (vibracionTemp <= rfinVib) then
				UPDATE adm.tbl_excel SET validado='1' WHERE id_excel=idTemp;

			else
				UPDATE adm.tbl_excel SET validado='2', observacion = 'Vibración no válida' WHERE id_excel=idTemp;

			end if;
		else 
			if (vibracionTemp >= riniVib) AND (vibracionTemp <= rfinVib) then		
				UPDATE adm.tbl_excel SET validado='2', observacion = 'Temperatura no válida' WHERE id_excel=idTemp;
			else
				UPDATE adm.tbl_excel SET validado='2', observacion = 'Temperatura y Vibración no son Válidos' WHERE id_excel=idTemp;
			end if;
		end if;

		delete from tmp_excel where id_excel=idTemp;

		i := i + 1;
	
	END LOOP;

	
	DROP TABLE tmp_excel;
	COMMIT;
END;
$BODY$;
