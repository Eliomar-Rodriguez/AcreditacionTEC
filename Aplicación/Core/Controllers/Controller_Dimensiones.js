angular.module("acreditacion")
    /*Controller oncharge of managing the dimensions side, allows to apply the CRUD, works along Http_Request factory*/
    .controller("Dimensiones",function ($scope,Http_Request) {
        /*Start ------------------------ Lists --------------------------------*/
        $scope.lista_dimensiones = [];
        /*----------------------------END Lists--------------------------------*/

        /*Start -------------------------Variables -----------------------------*/
        /*HTTP REQUEST -- Description: used to place which method and endpoint will be use*/
        let http_request = {
            method : "",
            endPoint : ""
        };
        /*---INSERT----*/
        //Contains information about the new dimension
        $scope.new_item = {
            ID: "",
            Dimension
        };
        /*---EDIT------*/
        //Contains the information about the selected item that is about to be edited
        $scope.dimension_selected_edit = {
            ID: "",
            Dimension
        };
        /*----------------------------END Variables ----------------------------*/

        /*Start -------------------------Methods---------------------------------*/
        /*Start ---On Load --Description: Get the data from the server when the page loads---------*/
        $scope.onLoad = function(){
            getData();
        };
        /*---------------------------END On Load---------------------------------*/

        /*Start------INSERT-- Description: send a new item to the endPoint insertDimension-----*/
        $scope.insertData = function(new_item){
            http_request.method = "POST";
            http_request.endPoint = "insertDimension";
            swal({
                    title: "Alerta",
                    text: "Seguro que desea insertar el registro? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Sí!",
                    cancelButtonText: "No, Cancelar!",
                    cancelButtonClass:"btn-danger",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function() {
                    Http_Request.Http_Request(function (http_request,new_item,response) {
                        if(response.data) {
                            getData();
                            swal("Alerta","Registro insertado con éxito!","success");
                        }
                        else swal("Alerta","Error al insertar el registro!","error");
                    });
                }
            );
        };
        /*---------------------------END INSERT----------------------------------*/

        /*Start---------EDIT-- Description: edits the information of an existing register---*/
        //Opens the modal and loads the information related with the selected item
        $scope.openEditModal = function(item){
            dimension_selected_edit.ID = item.ID;
            dimension_selected_edit.Dimension = item.Dimension;
            $("#modalEditDimension").modal("show");
        };
        $scope.editData = function (new_item) {
            if(input_validation(new_item)){
                http_request.method = "PUT";
                http_request.endPoint = "insertDimension";
                swal({
                        title: "Alerta",
                        text: "Seguro que desea editar el registro? ",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function() {
                        Http_Request.Http_Request(function (http_request,new_item,response) {
                            if(response.data) {
                                getData();
                                swal("Alerta","Registro editado con éxito!","success");
                            }
                            else swal("Alerta","Error al editar el registro!","error");
                        });
                    }
                );
            }
        };
        /*---------------------------END EDIT------------------------------------*/

        /*Start---------DELETE--Description: Remove an existing register located at the data base------*/
        $scope.deleteData = function (ID_Dimension) {
                http_request.method = "DELETE";
                http_request.endPoint = "deleteDimension";
            swal({
                    title: "Alerta",
                    text: "Seguro que desea eliminar? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Sí!",
                    cancelButtonText: "No, Cancelar!",
                    cancelButtonClass:"btn-danger",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function() {
                    Http_Request.Http_Request(http_request,{ID:ID_Dimension},function (response) {
                        if(response.data){
                            delete_auxiliar(ID_Dimension);
                            swal("Alerta","Registro eliminado con éxito!","success");
                        }
                        else swal("Alerta","Error al eliminar el registro!","error");
                    });
                }
            );
        };
        //Removes the item from the local list(lista_dimensiones)
        function delete_auxiliar(ID_Dimension) {
            for(item in $scope.lista_dimensiones){
                    if($scope.lista_dimensiones[item].ID == ID_Dimension) {$scope.lista_dimensiones.splice(item,1);return;}
            }
        }
        /*---------------------------END DELETE----------------------------------*/

        /*Start--------------------------Aux Methods-----------------------------*/
        /*---------------------------END Aux Methods-----------------------------*/
        //Obtains all the data related with dimensions from the data base and its saved in a list(lista_dimensiones)
        function getData() {
            http_request.method = "GET";
            http_request.endPoint = "selectDimensiones";
            setTimeout(function () {
                $scope.$apply(function () {
                    Http_Request.Http_Request(http_request,{},function (response) {
                        if(response.data != null)$scope.lista_dimensiones = response.data;
                        else $.notify("Error al obtener los registros!","error")
                    });
                });
            }, 250);
        }
        //Verify if all the necesary inputs are not empty
        function input_validation(item) {
            if(item.Dimension != "")return true;
            else return false;
        }
        /*----------------------------END Methods -------------------------------*/
    })
;