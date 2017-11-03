/**
 * Created by Josue on 29/10/2017.
 */

angular.module("acreditacion")
    .factory("claseComponente",function () {
        class Componente{
            constructor(id,nombreComponente){
                this.idComponente = id;
                this.nombreComponente = nombreComponente;
            }
            getComponent(){
                return this.idComponente;
            }
            editarComponente(nuevoNombre){
                this.nombreComponente = nuevoNombre;
            }
        }
    })
    .service("gestionComponentes",function () {

    });