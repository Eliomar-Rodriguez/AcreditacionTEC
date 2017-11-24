/**
 * Created by Josue on 29/10/2017.
 */

angular.module("acreditacion")
    .factory("claseComponente",function () {
        class componente{
            constructor(id,nombreComponente){
                this.idComponente = id;
                this.nombreComponente = nombreComponente;
            }
            getComponent(){
                return this.idComponente;
            }
            getNombre(){
                return this.nombreComponente;
            }
            editarComponente(nuevoNombre){
                this.nombreComponente = nuevoNombre;
            }
        }
        return componente;
    })
    .service("gestionComponentes",function () {

    });