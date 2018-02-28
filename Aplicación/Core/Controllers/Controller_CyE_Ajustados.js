/**
 * Created by Josue on 25/11/2017.
 */
angular.module("acreditacion")

    .controller("CYE_Ajustados",function ($scope,Http_Request) {

        /*Start --------------------------------- Listas-----------------------------------------*/
        $scope.lista_cye = [{ID : "C1",Criterio : "Criterio 1"},{ID : "C2",Criterio : "Criterio 2"},{ID : "C3",Criterio :"Criterio 3"}];
        $scope.lista_cye_ajustados = [
            {
                ID : "C_A 1",
                Criterio : "Criterio 1",
                CriterioAjustado: "C Y A 1",
                Observacion : "Observacion 1",
                Valoracion : "Deficiente",
                Responsable : "Responsable 1",
                Correo: "Correo 1",
                FLOC : new Date()
            },
            {
                ID : "C_A 2",
                Criterio : "Criterio 2",
                CriterioAjustado: "C Y A 2",
                Observacion : "Observacion 2",
                Valoracion : "Excelente",
                Responsable : "Responsable 2",
                Correo: "Correo 2",
                FLOC : new Date()
            },
            {
                ID : "C_A 3",
                Criterio : "Criterio 3",
                CriterioAjustado: "C Y A 3",
                Observacion : "Observacion 3",
                Valoracion : "Regular",
                Responsable : "Responsable 3",
                Correo: "Correo 3",
                FLOC : new Date()
            }
        ];
        $scope.lista_responsables = [
            {Responsable : "Responsable 1",Correo: "Correo 1"},
            {Responsable : "Responsable 2",Correo : "Correo 2"},
            {Responsable : "Responsable 3", Correo: "Correo 3"}];
        $scope.lista_valoraciones = [{Valoracion : "Deficiente"},{Valoracion : "Regular"},{Valoracion : "Bien"},{Valoracion : "Excelente"}];
        /*---------------------------------------END Listas---------------------------------------------------------*/

        /*Start -------------------------------- Variables--------------------------------------------------*/
        let http_request = {
            method : "",
            endPoint : ""
        };
        /*-----------INSERT-------------*/
        $scope.new_item ={
            Criterio : "",
            CriterioAjustado : "",
            Observacion : "",
            Valoracion : "",
            Responsable : "",
            Correo : "",
            FLOC : ""
        };
        /*----------END INSERT----------------*/

        /*-----------EDIT---------------*/
        $scope.cye_selected_edit = {
          ID: "",
          Criterio : "",
          CriterioAjustado : "",
          Observaciones : "",
          Valoracion : "",
          Responsable : "",
          Correo: "",
          FLOC : ""
        };
        /*----------END EDIT----------------*/
        /*--------------------------END Variables---------------------------------------------*/

        /*-------------------------Start -- Methods ------------------------------------------*/
        /*Start -- Obtains the information from the webService and loads it on the variables*/
        $scope.onLoad = function() {
            FactoryCYE_Ajustados.getAllData(function (result) {
                //$scope.lista_cye_ajustados = result;
                //$scope.lista_filtrada_cye_ajustados = result;
            });
            FactoryCYE_Ajustados.getCYE(function (result) {
                //$scope.lista_cye = result;
            });
            FactoryCYE_Ajustados.getResponsables(function (result) {
                //$scope.lista_responsables = result;
            });
        };
        /*--END--*/

        /*Start -- Insert New Data*/
        $scope.insertData = function (new_item) {//
            http_request.method = "POST";
            http_request.endPoint = "insertCYEA";
            //Http_Request.Http_Request(function (http_request,new_item,response) {
                //if(response)
                    add_new_item({
                        ID_CYE_General: new_item.Criterio.ID,
                        CriterioAjustado : new_item.CriterioAjustado,
                        Observaciones : new_item.Observacion,
                        ID_Valoracion : new_item.Valoracion.Valoracion,
                        Responsable : new_item.Responsable,
                        FLOC : new_item.FLOC  //faltan datos de poner aqui
                    });
               // else $.notify("Error al insertar","error");
            //});
        };
        function add_new_item(item) {debugger;
            $scope.lista_cye_ajustados.push(item);
            $.notify("Se insertó correctamente!","success");
        }
        /*--END--*/

        /*Start -- Edit Existing Data*/
        /*Open modal that loads data and allows to edit it*/
        $scope.openModalEdit = function (item) {
            $scope.cye_selected_edit.ID = item.ID;
            $scope.cye_selected_edit.Criterio = item.Criterio;
            $scope.cye_selected_edit.CriterioAjustado = item.CriterioAjustado;
            $scope.cye_selected_edit.Observaciones = item.Observacion;
            $scope.cye_selected_edit.Valoracion = item.Valoracion;
            $scope.cye_selected_edit.Responsable = item.Responsable;
            $scope.cye_selected_edit.Correo = item.Correo;
            $scope.cye_selected_edit.FLOC = item.FLOC;
            $("#modalEditCYEA").modal("show");
        };
        /*Call the endpoint that edits data, object must be send first*/
        $scope.editData = function (item) {
            swal({
                    title: "Alerta",
                    text: "Seguro que desea editar? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Sí, Crearlo!",
                    cancelButtonText: "No, Cancelar!",
                    cancelButtonClass:"btn-danger",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function() {
                    if(validate_information(item)){
                        //FactoryCYE_Ajustados.editData(item);
                        edit_auxiliar(item);
                        swal("Aviso!","Información editada con éxito","success");
                    }
                    else swal("Alert!","Complete todos los campos primero!","error");
                }
            );

        };
        /*Allows to change the edited item in the list*/
        function edit_auxiliar(new_item) {
            for(item in $scope.lista_cye_ajustados){
                if($scope.lista_cye_ajustados[item].ID == new_item.ID){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.lista_cye_ajustados[item] = new_item;
                        });
                    }, 100);
                }

            }
        }
        /*--END--*/

        /*Start -- Delete Existing Data*/
        $scope.deleteData = function (ID) {
            swal({
                    title: "Alerta",
                    text: "Seguro que desea eliminar? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Sí, Crearlo!",
                    cancelButtonText: "No, Cancelar!",
                    cancelButtonClass:"btn-danger",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function() {
                    FactoryCYE_Ajustados.deleteData({ID: ID});
                    delete_auxiliar(ID);
                    swal("Aviso!","Información eliminada con éxito","success");
                }
            );

        };
        /*Allows to remove the deleted item from the current list*/
        function delete_auxiliar(ID) {
            for(item in $scope.lista_cye_ajustados){
                if($scope.lista_cye_ajustados[item].ID == ID){
                    $scope.lista_cye_ajustados.splice(item,1);
                }
            }
        }
        /*--END--*/


        /*Allows to validate the entered information*/
        function validate_information(item) {
            if(item.Criterio != "" && item.Ajustado != "" && item.Observaciones != "" && item.Valoraciones != "" &&
                item.Responsable != "" && item.Correo != "" && item.Fecha_Limite != "") return true;
            else return false;
        }

        /*-----------------------------END methods------------------------*/
    })
;
