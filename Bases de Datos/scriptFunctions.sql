USE AcreditacionTEC
GO
/*
============================================================
1.	 PROCEDIMIENTOS TABLA DIMENSIONES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas dimensiones enviando el nombre
*/
CREATE PROCEDURE dbo.insertDimension -- LISTO
	@nombreDimension	VARCHAR(50),
	@ID_Componente		INT 
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.Dimension = @nombreDimension AND D.ID_Componente = @ID_Componente) = 1)
			BEGIN
				RAISERROR('La dimensión que intenta insertar ya se encuentra registrada.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Dimensiones (Dimension, ID_Componente)  VALUES (@nombreDimension,@ID_Componente);
			END;			
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de de dimensiones y recibe por parámetro el ID de la dimensión a 
	editar y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editDimension -- LISTO
	@ID_Dimension		INT,
	@nombreDimension	VARCHAR(50),
	@ID_Componente		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.ID = @ID_Dimension) = 1)
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Componentes AS D WHERE D.ID = @ID_Componente) = 1)
					BEGIN
						UPDATE dbo.Dimensiones 
						SET Dimension= @nombreDimension,
							ID_Componente = @ID_Componente
						WHERE ID = @ID_Dimension;
					END;
				ELSE
					BEGIN
						RAISERROR('El componente que intenta asociar no se encuentra registrado.',16,1);
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La dimensión que intenta editar no se encuentra registrada.',16,1);
			END;		
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una dimensión en especifico enviando por parámetro el ID de la
	dimensión a eliminar
*/
CREATE PROCEDURE dbo.deleteDimension -- LISTO
	@ID_Dimension	INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.ID = @ID_Dimension) = 1)
			BEGIN
				DELETE FROM dbo.Dimensiones WHERE ID = @ID_Dimension;
			END;
		ELSE
			BEGIN
				RAISERROR ('La dimensión que intentas eliminar no existe.',16,1);
			END;		
	END;
GO


/*
============================================================
2.	 PROCEDIMIENTOS TABLA COMPONENTES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos componentes enviando el nombre y la dimension a la que pertenece
*/
CREATE PROCEDURE dbo.insertComponente -- listo
	@nombreComponente	VARCHAR(50)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.Componente = @nombreComponente) = 1)
			BEGIN
				RAISERROR('El componente que intenta insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Componentes (Componente)  VALUES (@nombreComponente);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de componentes y recibe por parámetro el ID del componente a 
	editar, el ID de la nueva dimensión y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editComponente -- listo
	@ID_Componente		INT,
	@nombreComponente	VARCHAR(50)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- existe el componente a editar
			BEGIN
				UPDATE dbo.Componentes 
				SET Componente= @nombreComponente
				WHERE ID = @ID_Componente;
					
			END;
		ELSE
			BEGIN
				RAISERROR('El componente que intenta editar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de un componente en especifico enviando por parámetro el ID del componente a eliminar
*/
CREATE PROCEDURE dbo.deleteComponente -- listo
	@ID_Componente		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1)
			BEGIN
				DELETE FROM dbo.Componentes WHERE ID = @ID_Componente;
			END;
		ELSE
			BEGIN
				RAISERROR('El componente que deseas eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO


/*
============================================================
3.		PROCEDIMIENTOS TABLA SEDES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas sedes enviando el nombre
*/
CREATE PROCEDURE dbo.insertSede --listo
	@nombreSede		VARCHAR(50)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.Sede = @nombreSede) = 1)
			BEGIN
				RAISERROR('La sede que deseas insertar ya se encuentra registrada.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Sedes(Sede)  VALUES (@nombreSede);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de componentes y recibe por parámetro el ID del componente a 
	editar, el ID de la nueva dimensión y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editSede -- listo
	@ID_Sede		INT,
	@nombreSede		VARCHAR(50)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1)
			BEGIN
				UPDATE dbo.Sedes 
				SET Sede= @nombreSede
				WHERE ID = @ID_Sede;
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que intentas editar no se encuentra registrada.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una sede en especifico enviando por parámetro el ID de la sede a eliminar
*/
CREATE PROCEDURE dbo.deleteSede --listo
	@ID_Sede	INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1)
			BEGIN
				DELETE FROM dbo.Sedes WHERE ID = @ID_Sede;
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que intentas eliminar no se encuentra registrada.',16,1);
			END;
	END;
GO


/*
============================================================
4.		PROCEDIMIENTOS TABLA CARRERAS (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas sedes enviando el nombre y la sede a la que pertenece
*/
CREATE PROCEDURE dbo.insertCarrera -- listo
	@nombreCarrera		VARCHAR(50),
	@ID_Sede			INT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1) -- existe la sede a asociar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.Carrera = @nombreCarrera) = 0) -- verifica que no exista la carrera para insertarla
					BEGIN
						INSERT INTO dbo.Carreras(ID_Sede, Carrera)  VALUES (@ID_Sede, @nombreCarrera);
					END;
				ELSE
					BEGIN
						RAISERROR('La carrera que desea insertar ya se encuentra registrada.',16,1);	
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que desea asociar no se encuentra registrada.',16,1);
			END;			
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de carreras y recibe por parámetro el ID de la carrera a 
	editar, el ID de la nueva sede y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editCarrera -- listo
	@ID_Carrera		INT,
	@nombreCarrera	VARCHAR(50),
	@ID_Sede		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que exista la carrera que se desea editar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1) -- verifica que la sede exista
					BEGIN
						UPDATE dbo.Carreras 
						SET ID_Sede = @ID_Sede,
							Carrera = @nombreCarrera
						WHERE ID = @ID_Carrera;
					END;
				ELSE
					BEGIN
						RAISERROR('La sede que intenta asociar no se encuentra registrada.',16,1);
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La carrera que intenta editar no se encuentra registrada.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una carrera en especifico enviando por parámetro el ID de la carrera que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteCarrera -- listo
	@ID_Carrera		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1)
			BEGIN
				DELETE FROM dbo.Carreras WHERE ID = @ID_Carrera;
			END;
		ELSE
			BEGIN
				RAISERROR('La carrera que intenta eliminar no se encuentra registrada.',16,1);
			END;
	END;
GO


/*
============================================================
5.		PROCEDIMIENTOS TABLA CYE (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos CYE enviando el id del componente que tiene, el id de la carrera a la que se asigno y 
	el criterio en si que debe ser cumplido
*/
CREATE PROCEDURE dbo.insertCYE -- listo
	@ID_Componente		INT,
	@ID_Carrera			INT,
	@Criterio			VARCHAR(300)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.Criterio = @Criterio) = 0) -- verifica que el CYE no exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- verifica que exista el componente
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que exista la carrera
							BEGIN
								INSERT INTO dbo.CYE(ID_Componente, ID_Carrera, Criterio)  VALUES (@ID_Componente, @ID_Carrera, @Criterio);
							END;
						ELSE
							BEGIN
								RAISERROR('La carrera que intenta asociar no se encuentra registrada.',16,1);
							END;
					END;
				ELSE
					BEGIN
						RAISERROR('El componente que intenta asociar no se encuentra registrado.',16,1);
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYE que intenta insertar ya se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de CYE y recibe por parámetro el ID del CYE a 
	editar, el ID del componente, el ID de la carrera y el nuevo nombre que se le va a asignar al criterio
*/
CREATE PROCEDURE dbo.editCYE -- listo
	@ID_CYE				INT,
	@ID_Componente		INT,
	@ID_Carrera			INT,
	@Criterio			VARCHAR(300)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que el CYE exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- verifica que el componente exista
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que la carrera exista
							BEGIN
								UPDATE dbo.CYE 
								SET ID_Componente = @ID_Componente,
									ID_Carrera = @ID_Carrera,
									Criterio = @Criterio
								WHERE ID = @ID_CYE;
							END;
						ELSE
							BEGIN
								RAISERROR('La carrera que intenta asociar no se encuentra registrada.',16,1);
							END;
					END;
				ELSE
					BEGIN
						RAISERROR('El componente que intenta asociar no se encuentra registrado.',16,1);
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYE que intenta editar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de un CYE en especifico enviando por parámetro el ID del criterio que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteCYE -- listo
	@ID_CYE		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que el CYE exista
			BEGIN
				DELETE FROM dbo.CYE WHERE ID = @ID_CYE;
			END;
		ELSE
			BEGIN
				RAISERROR ('El CYE que intenta eliminar no se encuentra registrado.',16,1);
			END;
	END;	
GO


/*
======================================================================
6.	PROCEDIMIENTOS TABLA AUTOEVALUACIONESANUALES (con validaciones)
======================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas Autoevaluaciones Anuales enviando el id del encargado de dicha autoevaluacion
	 y el anio en el que se aplica la evaluacion
*/
CREATE PROCEDURE dbo.insertAutoevaluacionAnual --listo
	@ID_Encargado		INT,
	@anio				INT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.Anio = @anio AND A.ID_Encargado = @ID_Encargado) > 0)
			BEGIN
				RAISERROR ('La autoevalución que desea insertar ya se encuentra registrada.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.AutoevaluacionesAnuales(ID_Encargado, Anio)  VALUES (@ID_Encargado, @anio);
			END;
	END;    
GO
/*
	Procedimiento almacenado encargado de la edición de Autoevaluaciones Anuales y recibe por parámetro el ID de la Autoevaluaciones Anuales a 
	editar, el ID del nuevo encargado y el nuevo anio en el que se va a aplicar la evaluacion
*/
CREATE PROCEDURE dbo.editAutoevaluacionAnual -- listo
	@ID_AutoevalAnual		INT,
	@ID_Encargado			INT,
	@anio					INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.ID = @ID_AutoevalAnual) = 1) -- existe esa autoevaluacion
			BEGIN
				UPDATE dbo.AutoevaluacionesAnuales 
				SET ID_Encargado = @ID_Encargado,
					Anio = @anio
				WHERE ID = @ID_AutoevalAnual;
			END;
		ELSE
			BEGIN
				RAISERROR('La autoevaluación indicada no se encuentra registrada.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una Autoevaluacion Anual en especifico enviando por parámetro el ID de la Autoevaluacion que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteAutoevaluacionAnual -- listo
	@ID_AutoevalAnual		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.ID = @ID_AutoevalAnual) = 1)
			BEGIN
				DELETE FROM dbo.AutoevaluacionesAnuales WHERE ID = @ID_AutoevalAnual;
			END;
		ELSE
			BEGIN
				RAISERROR('La autoevaluación indicada no se encuentra registrada.',16,1);
			END;
	END;	
GO


/*
============================================================
7.	PROCEDIMIENTOS TABLA NIVELESIAE (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos Niveles IAE enviando el nombre del nivel
*/
CREATE PROCEDURE dbo.insertNivelIAE -- listo
	@Nivel		VARCHAR(50)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.NivelIAE = @Nivel) = 1) -- existe nivel
			BEGIN
				RAISERROR('El nivel IAE que desea agregar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.NivelesIAE(NivelIAE)  VALUES (@Nivel);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de Niveles IAE y recibe por parámetro el ID del nivel a editar, y el nuevo nombre a asignar
*/
CREATE PROCEDURE dbo.editNivelIAE -- listo
	@ID_Nivel		INT,
	@Nivel			VARCHAR(50)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_Nivel) = 1) -- existe nivel
			BEGIN
				UPDATE dbo.NivelesIAE 
				SET NivelIAE = @Nivel
				WHERE ID = @ID_Nivel;
			END;
		ELSE
			BEGIN
				RAISERROR('El nivel IAE que desea editar no se encuentra registrado.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un nivel IAE en especifico enviando por parámetro el ID del nivel a eliminar
*/
CREATE PROCEDURE dbo.deleteNivelIAE -- listo
	@ID_Nivel		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_Nivel) = 1) -- existe nivel
			BEGIN
				DELETE FROM dbo.NivelesIAE WHERE ID = @ID_Nivel;
			END;
		ELSE
			BEGIN
				RAISERROR('El nivel IAE que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;	
GO


/*
============================================================
8.	PROCEDIMIENTOS TABLA VALORACIONES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas valoraciones enviando el nombre de la valoracion
*/
CREATE PROCEDURE dbo.insertValoracion -- listo
	@Valoracion		VARCHAR(50)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.Valoracion = @Valoracion) = 1) -- existe valoracion
			BEGIN
				RAISERROR('La valoración que desea insertar ya se encuentra registrada.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Valoraciones(Valoracion)  VALUES (@Valoracion);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de una valoracion y recibe por parámetro el ID de la valoracion a editar, y el nuevo nombre a asignar
*/
CREATE PROCEDURE dbo.editValoracion -- listo
	@ID_Valoracion		INT,
	@Valoracion			VARCHAR(50)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe valoracion
			BEGIN
				UPDATE dbo.Valoraciones 
				SET Valoracion = @Valoracion
				WHERE ID = @ID_Valoracion;
			END;
		ELSE
			BEGIN
				RAISERROR('La valoración que desea editar no se encuentra registrada.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una valoracion en especifico enviando por parámetro el ID de la valoracion a eliminar
*/
CREATE PROCEDURE dbo.deleteValoracion -- listo
	@ID_Valoracion		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe valoracion
			BEGIN
				DELETE FROM dbo.Valoraciones WHERE ID = @ID_Valoracion;
			END;
		ELSE
			BEGIN
				RAISERROR('La valoración que desea eliminar no se encuentra registrada.',16,1);
			END;
	END;	
GO


/*
=======================================================================
9.	PROCEDIMIENTOS TABLA CUMPLIMIENTOS NOMINALES (con validaciones)
=======================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas fechas de cumplimiento nominal enviando la fecha a cumplir
*/
CREATE PROCEDURE dbo.insertCumplimientoNominal -- listo
	@FechaCumplimiento		DATE
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.FechaCumplimiento = @FechaCumplimiento) = 1) -- existe ya un CumplNomin
			BEGIN
				RAISERROR('El cumplimiento nominal que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN				
				INSERT INTO dbo.CumplimientosNominales(FechaCumplimiento) VALUES (@FechaCumplimiento);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de un cumplimiento nominal y recibe por parámetro el ID del cumplimiento nominal a editar, 
	y la nueva fecha de dicho cumplimiento
*/
CREATE PROCEDURE dbo.editCumplimientoNominal -- listo
	@ID_CumpliNominal		INT,
	@FechaCumplimiento		DATE
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.ID = @ID_CumpliNominal) = 1) -- existe un CumplNomin
			BEGIN
				UPDATE dbo.CumplimientosNominales 
				SET FechaCumplimiento = @FechaCumplimiento
				WHERE ID = @ID_CumpliNominal;
			END;
		ELSE
			BEGIN
				RAISERROR('El cumplimiento nominal que desea editar no se encuentra registrado.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un cumplimiento nominal en especifico enviando por parámetro el ID del cumplimiento a eliminar
*/
CREATE PROCEDURE dbo.deleteCumplimientoNominal -- listo
	@ID_CumpliNominal		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.ID = @ID_CumpliNominal) = 1) -- existe un CumplNomin
			BEGIN
				DELETE FROM dbo.CumplimientosNominales WHERE ID = @ID_CumpliNominal;
			END;
		ELSE
			BEGIN
				RAISERROR('El cumplimiento nominal que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO


/*
============================================================
10.	PROCEDIMIENTOS TABLA RESPONSABLES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos responsables enviando el correo del dicha persona
*/
CREATE PROCEDURE dbo.insertResponsable -- listo
	@Correo		VARCHAR(100)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.Correo = @Correo) = 1) -- existe un responsable
			BEGIN
				RAISERROR('El responsable que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Responsables(Correo)  VALUES (@Correo);
			END;
	END;    
GO
/*
	Procedimiento almacenado encargado de la edición de la informacion de responsables, recibe por parámetro el ID del responsable a editar, 
	y el nuevo correo del responsable
*/
CREATE PROCEDURE dbo.editResponsable -- listo
	@ID_Responsable		INT,
	@Correo				VARCHAR(100)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.ID = @ID_Responsable) = 1) -- existe un responsable
			BEGIN
				UPDATE dbo.Responsables 
				SET Correo = @Correo
				WHERE ID = @ID_Responsable;
			END;
		ELSE
			BEGIN
				RAISERROR('El responsable que desea editar no se encuentra registrado.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un responsable especifico enviando por parámetro el ID del responsable a eliminar
*/
CREATE PROCEDURE dbo.deleteResponsable -- listo
	@ID_Responsable		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.ID = @ID_Responsable) = 1) -- existe un responsable
			BEGIN
				DELETE FROM dbo.Responsables WHERE ID = @ID_Responsable;
			END;
		ELSE
			BEGIN
				RAISERROR('El responsable que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;	
GO


/*
============================================================
11.	 PROCEDIMIENTOS TABLA EVIDENCIAS (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas evidencias enviando el tipo de evidencia que es y la direccion en el servidor de donde se
	encuentra la imagen almacenada
*/
CREATE PROCEDURE dbo.insertEvidencia -- listo
	@TipoEvidencia		INT,
	@URL				VARCHAR(350)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.TipoEvidencia = @TipoEvidencia AND E.URL = @URL) = 1) -- existe una evidencia
			BEGIN
				RAISERROR('La evidencia que desea insertar ya se encuentra registrada.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Evidencias(TipoEvidencia, URL)  VALUES (@TipoEvidencia, @URL);
			END;
	END;    
GO
/*
	Procedimiento almacenado encargado de la edición de una evidencia, recibe por parámetro el ID de la evidencia a editar, 
	el nuevo tipo de evidencia que es y nueva direccion en el servidor
*/
CREATE PROCEDURE dbo.editEvidencia -- listo
	@ID_Evidencia		INT,
	@TipoEvidencia		INT,
	@URL				VARCHAR(350)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.ID = @ID_Evidencia) = 1) -- existe una evidencia
			BEGIN
				UPDATE dbo.Evidencias 
				SET TipoEvidencia = @TipoEvidencia,
					URL = @URL
				WHERE ID = @ID_Evidencia;
			END;
		ELSE
			BEGIN			
				RAISERROR('La evidencia que desea editar no se encuentra registrada.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una evidencia especifica enviando por parámetro el ID de la evidencia a eliminar
*/
CREATE PROCEDURE dbo.deleteEvidencia -- LISTO
	@ID_Evidencia		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.ID = @ID_Evidencia) = 1) -- existe una evidencia
			BEGIN
				DELETE FROM dbo.Evidencias WHERE ID = @ID_Evidencia;
			END;
		ELSE
			BEGIN
				RAISERROR('La evidencia que desea eliminar no se encuentra registrada.',16,1);
			END;
	END;
GO


/*
============================================================
12.		PROCEDIMIENTOS TABLA CYEA (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos CYEA enviando todos los datos necesarios
*/
CREATE PROCEDURE dbo.insertCYEA -- LISTO
	@ID_CYE_General			INT,
	@ID_Valoracion			INT,
	@ID_NivelIAE			INT,
	@CriterioAjustado		VARCHAR(350),
	@FLOC					DATE,
	@FLA					DATE,
	@IncorporadoIAE			INT,
	@Observaciones			VARCHAR(500)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE_General) = 1) -- existe el CYE
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe la valoracion
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_NivelIAE) = 1) -- existe el nivel IAE
							BEGIN
								IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE 
																	C.ID_CYE_General = @ID_CYE_General AND
																	C.ID_Valoracion = @ID_Valoracion AND
																	C.ID_NivelIAE = @ID_NivelIAE AND
																	C.CriterioAjustado = @CriterioAjustado AND
																	C.FLOC = @FLOC AND
																	C.FLA = @FLA AND
																	C.IncorporadoIAE = @IncorporadoIAE AND
																	C.Observaciones = 	@Observaciones) = 1) -- existe un CYEA
									BEGIN
										RAISERROR('El CYEA que desea agregar ya se encuentra registrado.',16,1);
									END
								ELSE
									BEGIN
										INSERT INTO dbo.CYEA(ID_CYE_General, ID_Valoracion, ID_NivelIAE, CriterioAjustado, FLOC, FLA, IncorporadoIAE, Observaciones)  VALUES 
											(@ID_CYE_General, @ID_Valoracion, @ID_NivelIAE, @CriterioAjustado, @FLOC, @FLA, @IncorporadoIAE, @Observaciones);
									END;
							END
						ELSE
							BEGIN
								RAISERROR('El nivel IAE que desea agregar no se encuentra registrado.',16,1);
							END;
					END
				ELSE
					BEGIN
						RAISERROR('La valoración que desea agregar no se encuentra registrada.',16,1);
					END;
			END
		ELSE
			BEGIN
				RAISERROR('El CYE que desea agregar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de un CYEA, recibe por parametro todos los datos necesarios que sustituiran los datos anteriores
*/
CREATE PROCEDURE dbo.editCYEA -- listo
	@ID_CYEA				INT,
	@ID_CYE_General			INT,
	@ID_Valoracion			INT,
	@ID_NivelIAE			INT,
	@CriterioAjustado		VARCHAR(350),
	@FLOC					DATE,
	@FLA					DATE,
	@IncorporadoIAE			INT,
	@Observaciones			VARCHAR(500)
AS
	BEGIN		
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE_General) = 1) -- existe un CYE
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe una valoracion
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_NivelIAE) = 1) -- existe un nivel IAE
							BEGIN
								IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- existe el CYEA
									BEGIN
										UPDATE dbo.CYEA 
										SET ID_CYE_General = @ID_CYE_General,
											ID_Valoracion = @ID_Valoracion,
											ID_NivelIAE = @ID_NivelIAE,
											CriterioAjustado = @CriterioAjustado,
											FLOC = @FLOC,
											FLA = @FLA,
											IncorporadoIAE = @IncorporadoIAE,
											Observaciones = @Observaciones
										WHERE ID = @ID_CYEA;										
									END
								ELSE
									BEGIN
										RAISERROR('El CYEA que desea editar no se encuentra registrado.',16,1);
									END;
							END
						ELSE
							BEGIN
								RAISERROR('El nivel IAE que desea agregar no se encuentra registrado.',16,1);
							END;
					END
				ELSE
					BEGIN
						RAISERROR('La valoración que desea agregar no se encuentra registrada.',16,1);
					END;
			END
		ELSE
			BEGIN
				RAISERROR('El CYE que desea agregar no se encuentra registrado.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un CYEA especifico enviando por parámetro el ID del CYEA a eliminar
*/
CREATE PROCEDURE dbo.deleteCYEA -- listo
	@ID_CYEA		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- existe un CYEA
			BEGIN
				DELETE FROM dbo.CYEA WHERE ID = @ID_CYEA;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYEA que desea eliminar no se encuentra registrado.',16,1);
			END;	
	END;
GO


/*
================================================================
13.	PROCEDIMIENTOS TABLA CYEA_RESPONSABLES (con validaciones)
================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia CYEA_Responsables
*/
CREATE PROCEDURE dbo.insertCYEA_Responsables -- listo
	@ID_CYEA				INT,
	@ID_Responsable			INT,
	@TipoResponsabilidad	VARCHAR(250)
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Responsables AS CR WHERE CR.ID_CYEA = @ID_CYEA AND CR.ID_Responsable = @ID_Responsable AND CR.TipoResponsabilidad = @TipoResponsabilidad) = 1) -- existe el registro
			BEGIN 
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE -- no existe el registro
			BEGIN
				INSERT INTO dbo.CYEA_Responsables(ID_CYEA, ID_Responsable, TipoResponsabilidad)  VALUES (@ID_CYEA, @ID_Responsable, @TipoResponsabilidad);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia CYEA_Responsables
*/
CREATE PROCEDURE dbo.editCYEA_Responsables -- listo
	@ID_CYEA_Old				INT,
	@ID_Responsable_Old			INT,
	@TipoResponsabilidad_Old	VARCHAR(250),

	@ID_CYEA					INT,
	@ID_Responsable				INT,
	@TipoResponsabilidad		VARCHAR(250)
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Responsables AS CR WHERE CR.ID_CYEA = @ID_CYEA_Old AND CR.ID_Responsable = @ID_Responsable_Old AND CR.TipoResponsabilidad = @TipoResponsabilidad_Old) = 1) -- existe el registro
			BEGIN 
				UPDATE dbo.CYEA_Responsables 
				SET ID_CYEA = @ID_CYEA,
					ID_Responsable = @ID_Responsable,
					TipoResponsabilidad = @TipoResponsabilidad
				WHERE ID_CYEA = @ID_CYEA_Old AND ID_Responsable = @ID_Responsable_Old AND TipoResponsabilidad = @TipoResponsabilidad_Old;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia CYEA_Responsables
*/
CREATE PROCEDURE dbo.deleteCYEA_Responsable -- listo
	@ID_CYEA				INT,
	@ID_Responsable			INT,
	@TipoResponsabilidad	INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Responsables AS CR WHERE CR.ID_CYEA = @ID_CYEA AND CR.ID_Responsable = @ID_Responsable AND CR.TipoResponsabilidad = @TipoResponsabilidad) = 1) -- existe el registro
			BEGIN 
				DELETE FROM dbo.CYEA_Responsables WHERE ID_CYEA = @ID_CYEA AND ID_Responsable = @ID_Responsable AND TipoResponsabilidad = @TipoResponsabilidad;
			END;
		ELSE	
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO


/*
============================================================
14.	  PROCEDIMIENTOS TABLA Auto_CYEA (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia Auto_CYEA
*/
CREATE PROCEDURE dbo.insertAuto_CYEA
	@ID_CYEA				INT,
	@ID_Autoeval			INT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Auto_CYEA AS CR WHERE CR.ID_CYEA = @ID_CYEA AND CR.ID_Autoeval = @ID_Autoeval) = 1) -- existe el registro
			BEGIN 
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN			
				INSERT INTO dbo.Auto_CYEA(ID_Autoeval, ID_CYEA)  VALUES (@ID_Autoeval, @ID_CYEA);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia Auto_CYEA
*/
CREATE PROCEDURE dbo.editAuto_CYEA -- listo
	@ID_CYEA_Old			INT,
	@ID_Autoeval_Old		INT,

	@ID_CYEA				INT,
	@ID_Autoeval			INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Auto_CYEA AS CR WHERE CR.ID_CYEA = @ID_CYEA_Old AND CR.ID_Autoeval = @ID_Autoeval_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.Auto_CYEA 
				SET ID_CYEA = @ID_CYEA,
					ID_Autoeval = @ID_Autoeval
				WHERE ID_CYEA = @ID_CYEA_Old AND ID_Autoeval = @ID_Autoeval_Old;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia Auto_CYEA
*/
CREATE PROCEDURE dbo.deleteAuto_CYEA -- listo
	@ID_CYEA				INT,
	@ID_Autoeval			INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Auto_CYEA AS CR WHERE CR.ID_CYEA = @ID_CYEA AND CR.ID_Autoeval = @ID_Autoeval) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.Auto_CYEA WHERE ID_CYEA = @ID_CYEA AND ID_Autoeval = @ID_Autoeval;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO


/*
===========================================================================
15.	 PROCEDIMIENTOS TABLA CumplimientosNominales_CYEA (con validaciones)
===========================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia CumplimientosNominales_CYEA
*/
CREATE PROCEDURE dbo.insertCumplimNominal_CYEA -- listo
	@ID_CumplimNominal		INT,
	@ID_CYEA				INT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_CYEA AS CN WHERE CN.ID_CYEA = @ID_CYEA AND CN.ID_CumplimNominal = @ID_CumplimNominal) = 1) -- existe el registro
			BEGIN
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.CumplimientosNominales_CYEA(ID_CumplimNominal, ID_CYEA)  VALUES (@ID_CumplimNominal, @ID_CYEA);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia CumplimientosNominales_CYEA
*/
CREATE PROCEDURE dbo.editCumplimNominal_CYEA -- LISTO
	@ID_CumplimNominal_Old		INT,
	@ID_CYEA_Old				INT,

	@ID_CumplimNominal			INT,
	@ID_CYEA					INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_CYEA AS CN WHERE CN.ID_CYEA = @ID_CYEA_Old AND CN.ID_CumplimNominal = @ID_CumplimNominal_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.CumplimientosNominales_CYEA 
				SET ID_CumplimNominal = @ID_CumplimNominal,
					ID_CYEA = @ID_CYEA
				WHERE ID_CYEA = @ID_CYEA_Old AND ID_CumplimNominal = @ID_CumplimNominal_Old;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia CumplimientosNominales_CYEA
*/
CREATE PROCEDURE dbo.deleteCumplimNominal_CYEA -- LISTO
	@ID_CumplimNominal		INT,
	@ID_CYEA				INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_CYEA AS CN WHERE CN.ID_CYEA = @ID_CYEA AND CN.ID_CumplimNominal = @ID_CumplimNominal) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.CumplimientosNominales_CYEA WHERE ID_CYEA = @ID_CYEA AND ID_CumplimNominal = @ID_CumplimNominal;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO


/*
===============================================================
16.	PROCEDIMIENTOS TABLA CYEA_Evidencias (con validaciones)
===============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia CYEA_Evidencias
*/
CREATE PROCEDURE dbo.insertCYEA_Evidencia -- LISTO
	@ID_CYEA			INT,
	@ID_Evidencia		INT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Evidencias AS CN WHERE CN.ID_CYEA = @ID_CYEA AND CN.ID_Evidencia = @ID_Evidencia) = 1) -- existe el registro
			BEGIN
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.CYEA_Evidencias(ID_CYEA	, ID_Evidencia)  VALUES (@ID_CYEA, @ID_Evidencia);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia CYEA_Evidencias
*/
CREATE PROCEDURE dbo.editCYEA_Evidencia
	@ID_CYEA_Old		INT,
	@ID_Evidencia_Old	INT,

	@ID_CYEA			INT,
	@ID_Evidencia		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Evidencias AS CN WHERE CN.ID_CYEA = @ID_CYEA_Old AND CN.ID_Evidencia = @ID_Evidencia_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.CYEA_Evidencias 
				SET ID_CYEA = @ID_CYEA,
					ID_Evidencia = @ID_Evidencia
				WHERE ID_CYEA = @ID_CYEA_Old AND ID_Evidencia = @ID_Evidencia_Old;
			END;
		ELSE
			BEGIN	
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia CYEA_Evidencias
*/
CREATE PROCEDURE dbo.deleteCYEA_Evidencia
	@ID_CYEA			INT,
	@ID_Evidencia		INT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA_Evidencias AS CN WHERE CN.ID_CYEA = @ID_CYEA AND CN.ID_Evidencia = @ID_Evidencia) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.CYEA_Evidencias WHERE ID_CYEA = @ID_CYEA AND ID_Evidencia = @ID_Evidencia;
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
			END;
	END;
GO