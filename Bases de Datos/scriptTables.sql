/*
Tabla componentes, contiene los componentes que son parte de un criterio a la hora de su evaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE Componentes(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	Componente		VARCHAR(50)			NOT NULL	UNIQUE,
	CONSTRAINT PK_Componentes_ID		PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla dimensiones, contiene las dimensiones las cuales son parte de los componentes
*/
USE AcreditacionTEC;
GO
CREATE TABLE Dimensiones(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	ID_Componente	INT					NOT NULL,
	Dimension		VARCHAR(50)			NOT NULL	UNIQUE,
	CONSTRAINT PK_Dimensiones_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Dimensiones_ID_Componente	FOREIGN KEY (ID_Componente) 
		REFERENCES	dbo.Componentes (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla sedes, contiene todas las sedes del Tecnológico
*/
USE AcreditacionTEC;
GO
CREATE TABLE Sedes(
	ID		INT	IDENTITY(1,1)		NOT NULL,
	Sede	VARCHAR(50)				NOT NULL	UNIQUE,
	CONSTRAINT PK_Sedes_ID			PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla carreras, contiene todas las carreras del TEC en general
*/
USE AcreditacionTEC;
GO
CREATE TABLE Carreras(
	ID			INT	IDENTITY(1,1)	NOT NULL,
	ID_Sede		INT					NOT NULL,
	Carrera		VARCHAR(50)			NOT NULL	UNIQUE,
	CONSTRAINT PK_Carreras_ID		PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Carreras_ID_Sede	FOREIGN KEY (ID_Sede) 
		REFERENCES	dbo.Sedes (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CYE, contiene los criterios y estandares propuestos/inpuestos por SINAES
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYE(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	ID_Componente	INT,
	ID_Carrera		INT,
	Criterio		VARCHAR (300)		NOT NULL	UNIQUE,
	CONSTRAINT PK_CYE_ID			PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_CYE_ID_Componente FOREIGN KEY (ID_Componente) 
		REFERENCES	dbo.Componentes (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYE_ID_Carrera FOREIGN KEY (ID_Carrera) 
		REFERENCES	dbo.Carreras (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla autoevaluaciones anuales, dichas evaluaciones se relacionan a una persona quien es el encargado principal 
de dicha evaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE AutoevaluacionesAnuales(
	ID				INT	IDENTITY(1,1)		NOT NULL,
	ID_Encargado	INT						NOT NULL,
	Anio			INT						NOT NULL,
	CONSTRAINT PK_AutoevaluacionesAnuales_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla NivelesIAE, contiene los niveles IAE
*/
USE AcreditacionTEC;
GO
CREATE TABLE NivelesIAE(
	ID			INT	IDENTITY(1,1)			NOT NULL,
	NivelIAE	VARCHAR(50)					NOT NULL	UNIQUE,
	CONSTRAINT PK_NivelesIAE_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla Valoraciones, contiene las valoraciones las cuales serán en escala de malo hasta excelente
*/
USE AcreditacionTEC;
GO
CREATE TABLE Valoraciones(
	ID			INT	IDENTITY(1,1)			NOT NULL,
	Valoracion	VARCHAR(50)					NOT NULL	UNIQUE,
	CONSTRAINT PK_Valoraciones_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla CumplimientosNominales, contiene fechas en las que se deben presentar avances o tener listo algún criterio
*/
USE AcreditacionTEC;
GO
CREATE TABLE CumplimientosNominales(
	ID					INT	IDENTITY(1,1)	NOT NULL,
	FechaCumplimiento	DATE				NOT NULL	UNIQUE,
	CONSTRAINT PK_CumplimientosNominales_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla Responsables, contiene las personas que son responsables de que un criterio se cumpla bajo los requisitos de SINAES
*/
USE AcreditacionTEC;
GO
CREATE TABLE Responsables(
	ID			INT	IDENTITY(1,1)	NOT NULL,
	Correo		VARCHAR(100)		NOT NULL	UNIQUE,
	CONSTRAINT PK_Responsables_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla Evidencias, contiene las evidencias que prueban el correcto cumplimiento de un criterio ajustado
*/
USE AcreditacionTEC;
GO
CREATE TABLE Evidencias(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	TipoEvidencia	INT					NOT NULL	UNIQUE,
	URL				VARCHAR	(350)		NOT NULL,
	CONSTRAINT PK_Evidencias_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla CYEA, tabla principal que contiene todos los CYE ya ajustados y listos para la autoevaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYEA(
	ID						INT IDENTITY(1,1)	NOT NULL,
	ID_CYE_General			INT,
	ID_Valoracion			INT,
	ID_NivelIAE				INT,
	CriterioAjustado		VARCHAR(350)		NOT NULL,
	FLOC					DATE				NOT NULL,
	FLA						DATE				NOT NULL,
	IncorporadoIAE			INT					NOT NULL,
	Observaciones			VARCHAR(500)		NOT NULL,

	CONSTRAINT PK_CYEA_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_CYEA_ID_CYE_General	FOREIGN KEY (ID_CYE_General) 
		REFERENCES	dbo.CYE (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYEA_ID_Valoracion FOREIGN KEY (ID_Valoracion) 
		REFERENCES	dbo.Valoraciones (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYEA_ID_NivelIAE	FOREIGN KEY (ID_NivelIAE) 
		REFERENCES	dbo.NivelesIAE (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CYEA_Responsables, tabla producida por la normalización de la relación entre las tablas CYEA y Responsables
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYEA_Responsables(
	ID_CYEA			INT,
	ID_Responsable	INT,
	TipoResponsabilidad VARCHAR(250),
	CONSTRAINT FK_CYEA_Responsables_ID_CYEA	FOREIGN KEY (ID_CYEA) 
		REFERENCES	dbo.CYEA (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYEA_Responsables_ID_Responsable	FOREIGN KEY (ID_Responsable) 
		REFERENCES	dbo.Responsables (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla Auto_CYEA, tabla que sale producto de la normalización entre las tablas AutoevaluacionesAnuales y CYEA y contiene 
cada todos los criterios que se asocian a un usuario administrador encargado de la evaluación de una carrera
*/
USE AcreditacionTEC;
GO
CREATE TABLE Auto_CYEA(
	ID_Autoeval		INT,
	ID_CYEA			INT,
	CONSTRAINT FK_Auto_CYEA_ID_Autoeval	FOREIGN KEY (ID_Autoeval) 
		REFERENCES	dbo.AutoevaluacionesAnuales (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_Auto_CYEA_ID_CYEA	FOREIGN KEY (ID_CYEA) 
		REFERENCES	dbo.CYEA (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CumplimientosNominales_CYEA, tabla producida por la normalización de la relación entre las tablas CYEA y
CumplimientosNominales
*/
USE AcreditacionTEC;
GO
CREATE TABLE CumplimientosNominales_CYEA(
	ID_CumplimNominal	INT,
	ID_CYEA				INT,
	CONSTRAINT FK_CumplimientosNominales_CYEA_ID_CYEA	FOREIGN KEY (ID_CYEA) 
		REFERENCES	dbo.CYEA (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT FK_CumplimientosNominales_CYEA_ID_CumplimNominal	FOREIGN KEY (ID_CumplimNominal) 
		REFERENCES	dbo.CumplimientosNominales (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CYEA_Evidencias, tabla producida por la normalización de la relación entre las tablas CYEA y Evidencias
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYEA_Evidencias(
	ID_CYEA				INT,
	ID_Evidencia		INT,
	CONSTRAINT FK_CYEA_Evidencias_ID_CYEA	FOREIGN KEY (ID_CYEA) 
		REFERENCES	dbo.CYEA (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYEA_Evidencias_ID_Evidencia	FOREIGN KEY (ID_Evidencia) 
		REFERENCES	dbo.Evidencias (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO