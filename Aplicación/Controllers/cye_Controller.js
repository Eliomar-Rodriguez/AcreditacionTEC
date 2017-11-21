/**
 * Created by Josue on 10/11/2017.
 */

angular.module('acreditacion')
    .factory("claseCYE",function () {
        class criterio_y_estandar{
            constructor(id,nombreCYE,listaDimensiones,idCarrera) {
                this._id = id;
                this._nombreCYE = nombreCYE;
                this._listaDimensiones = listaDimensiones;//CONTIENE LAS DIMENSIONES SELECCIONADAS
                this._idCarrera = idCarrera;
            }
            get id() {
                return this._id;
            }

            set id(value) {
                this._id = value;
            }

            get nombreCYE() {
                return this._nombreCYE;
            }

            set nombreCYE(value) {
                this._nombreCYE = value;
            }

            get listaDimensiones() {
                return this._listaDimensiones;
            }

            set listaDimensiones(value) {
                this._listaDimensiones.push(value);
            }

            get idCarrera() {
                return this._idCarrera;
            }

            set idCarrera(value) {
                this._idCarrera = value;
            }
        }
        return criterio_y_estandar;
    })
    .service("gestionCYE",function (claseCYE,$http) {
        /*ALMACENA LOS CRITERIOS Y ESTÁNDARES*/
        this.criterios_y_estandares = [];

        /*INSERTA NUEVOS REGISTROS EN LA BD*/
        this.postData = function (registro) {
            $http({
                method: 'POST',
                url: '"http://IP/funcion"',
                data: {
                    nombreParametro: registro.nombreCYE
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function(response) {
                    console.log(response.data);
                }.error(function (error) {
                    console.log(error);
                }));
        };

        /*OBTIENE TODOS LOS ELEMENTOS DE LA BD*/
        this.getData = function () {
            $http.get("http://IP/funcion")
                .then(function (response) {
                    llenarLista(response.data);
                    $.notify("Consulta exitosa!","info");
                },function (response) {
                    $.notify("Error al procesar consulta!","error")
                });
        };

        /*BORRA DE LA BD UN REGISTRO CYE*/
        this.deleteData = function (idCYE) {
            $http.get("http://IP/funcion")
                .then(function (response) {
                    $.notify("Consulta exitosa!","info");
                },function (response) {
                    $.notify("Error al procesar consulta!","error")
                });
        };

        /*ACTUALIZA UN REGISTRO DE LA BD*/
        this.editData = function (registro) {
            $http.get("http://IP/funcion")
                .then(function (response) {
                    llenarLista(response.data);
                    $.notify("Consulta exitosa!","info");
                },function (response) {
                    $.notify("Error al procesar consulta!","error")
                });
        };

        /*LLENA LA LISTA DE CRITERIOS Y ESTÁNDARES*/
        this.llenarLista = function (response) {
            for(item in response){
                this.criterio_y_estandar.push(
                    new claseCYE(response.ID,response.criterio,response.ID_Dimension,ID_Carrera)
                );
            }
        };

        /*BUSCA UN ELEMENTO DE LA LISTA CRITERIOS Y ESTÁNDARES*/
        this.getItem = function (nombreCYE) {
            for(item in this.criterio_y_estandar){
                if(this.criterio_y_estandar[i].nombreCYE == nombreCYE){
                    return this.criterio_y_estandar[i];
                }
            }
        };

        /*OBTIENE LA LISTA DE CRITERIOS Y ESTÁNDARES*/
        this.getAll = function () {
          return this.criterio_y_estandar;
        };

    })
    .service("conexionInterfaz",function ($scope,claseCYE,gestionCYE) {
        
    })
    .controller("CriteriosYEstandares",function ($scope,$http,$location) {
        
    })
;
