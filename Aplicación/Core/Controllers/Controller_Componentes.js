/**
 * Created by Josue on 27/11/2017.
 */
angular.module("acreditacion")
    /*Controller oncharge of managing the components side, allows to apply the CRUD, works along Http_Request factory*/
    .controller("Componentes",function ($scope,Http_Request) {
       /*Start ------------------------ Lists --------------------------------*/
       $scope.lista_componentes = [
           {
               ID : "C1",
               Componente : "Componente 1",
               ID_Dimension : "D1",
               Dimension : "Dimension 1"
           },
           {
               ID : "C1",
               Componente : "Componente 2",
               ID_Dimension : "D1",
               Dimension : "Dimension 2"
           }
       ];
       $scope.lista_dimensiones = [
           {
               ID_Dimension: "D1",
               Dimension: "Dimension 1"
           },
           {
               ID_Dimension : "D2",
               Dimension : "Dimension 2"
           }
       ];
       /*----------------------------END Lists--------------------------------*/

       /*Start -------------------------Variables -----------------------------*/
       /*HTTP REQUEST -- Description: used to place which method and endpoint will be use*/
       let http_request = {
           method : "",
           endPoint : ""
       };
       /*---INSERT----*/
       //Contains information about the new component
       $scope.new_item = {
           ID_Dimension : "",
           Dimension : "",
           Componente : ""
       };
       /*---EDIT------*/
       //Contains the information of the selected item that is about to be edited
       $scope.component_selected_edit = {
           ID : "",//ID of the component,
           Componente : "",
           ID_Dimension : "",
           Dimension : ""
       };

       /*----------------------------END Variables ----------------------------*/

       /*Start -------------------------Methods---------------------------------*/
       /*Start ---On Load --Description: Get the data from the server when the page loads---------*/
       $scope.onLoad = function () {
           getData();
       };
       /*---------------------------END On Load---------------------------------*/

       /*Start------INSERT-- Description: send a new item to the endPoint insertComponente-----*/
       $scope.insertData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "insertComponente";
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
       //Opens the modal and loads the selected information
       $scope.openEditModal = function(item){
           $scope.component_selected_edit.ID_Dimension = item.ID_Dimension;
           $scope.component_selected_edit.Dimension = item.Dimension;
           $scope.component_selected_edit.Componente = item.Componente;
           $scope.component_selected_edit.ID = item.ID;
           $("#modalEditComponent").modal("show");
       };
       $scope.editData = function (new_item) {
           http_request.method = "PUT";
           http_request.endPoint = "editComponente";
           swal({
                   title: "Alerta",
                   text: "Seguro que desea editar el registro? ",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonClass: "btn-primary",
                   confirmButtonText: "Sí!",
                   cancelButtonText: "No, Cancelar!",
                   cancelButtonClass:"btn-danger",
                   closeOnConfirm: true,
                   closeOnCancel: true
               },
               function() {debugger;
                   Http_Request.Http_Request(http_request,{ID : new_item.ID, Componente : new_item.Componente, ID_Dimension : new_item.ID_Dimension},function (response) {
                       if(response.data) {
                           getData(); //Refresh the information
                           swal("Alerta","Registro editado con éxito!","success");
                       }
                       else swal("Alerta","Error al editar el registro!","error");
                   });
               }
           );
       };
       /*---------------------------END EDIT------------------------------------*/

       /*Start--------DELETE-- Description: remove an existing register from the data base-----*/
       $scope.deleteData = function (ID_Componente) {
           http_request.method = "DELETE";
           http_request.endPoint = "deleteComponente";
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
                   Http_Request.Http_Request(http_request,{ID:ID_Componente},function (response) {
                        if(response.data){
                            delete_auxiliar(ID_Componente);
                            swal("Alerta","Registro eliminado con éxito!","success");
                        }
                        else swal("Alerta","Error al eliminar el registro!","error");
                   });

               }
           );
       };
        /*Allows to remove the deleted item from the current list(lista_componentes)*/
        function delete_auxiliar(ID_Componente) {
            for(item in $scope.lista_componentes){
                if($scope.lista_componentes[item].ID == ID_Componente){
                    $scope.lista_componentes.splice(item,1);
                }
            }
        }
       /*---------------------------END DELETE----------------------------------*/

       /*Start--------------------------Aux Methods-----------------------------*/
       //Obtains the information from the endPoint selectDimensiones and selectComponentes
        function getData() {
           http_request.method = "GET";
           http_request.endPoint = "selectDimensiones";
            setTimeout(function () {
                $scope.$apply(function () {
                    Http_Request.Http_Request(http_request,{},function (response) {
                        if(response.data != null)$scope.lista_dimensiones = response.data;
                        else $.notify("Error al obtener las dimensiones!","error");
                    });
                    http_request.endPoint = "selectComponentes";
                    Http_Request.Http_Request(http_request,{},function (response) {
                        if(response.data != null)give_component_format($scope.lista_dimensiones,response.data);
                        else $.notify("Error al obtener los componentes!","error");
                    });
                });
            }, 250);
       }
        //Links the component data with dimension data, creates a new JSON with both information mixed
        function give_component_format(listaDimensiones, lista_Componentes) {
            for(dimension in listaDimensiones){
                for(componente in lista_Componentes){
                    if(listaDimensiones[dimension].ID == lista_Componentes[componente].ID_Dimension)
                        $scope.lista_componentes.push(
                            {
                                ID : lista_Componentes[componente].ID,
                                Componente : lista_Componentes[componente].Componente,
                                ID_Dimension : listaDimensiones[dimension].ID,
                                Dimension : listaDimensiones[dimension].Dimension
                            }
                        );
                }
            }
        }
       /*---------------------------END Aux Methods-----------------------------*/

       /*----------------------------END Methods -------------------------------*/
    })
;