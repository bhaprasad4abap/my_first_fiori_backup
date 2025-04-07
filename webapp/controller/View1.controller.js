sap.ui.define([
"ibm/hr/payroll/controller/BaseController",
"sap/ui/model/Filter",
"sap/ui/model/FilterOperator"

],
function(BaseController, Filter, FilterOperator)
{
    return BaseController.extend("ibm.hr.payroll.controller.View1",  {
        onInit:function(){
// Inside any controller we can go to component and obtain our router object 
        this.oRouter = this.getOwnerComponent().getRouter();



        },

        onDeleteItem: function(oEvent){

            // Step 1 : get the object of the item on which the deletion was fired
                var oItemToBeDeleted = oEvent.getParameter("listItem");
            // step 2: get the object of the list control, here getSource will return the source control of the event triggered.  
                var oListCtl = oEvent.getSource();
            // step 3 : perfrom deletion 
                 oListCtl.removeItem(oItemToBeDeleted);

        },


        onGoTo: function(sPath){
            // Step 1 : Goto parent/mother of views - get the app contrainer control 
         //   var oAppCon = sap.ui.getCore().byId("idAppCon");  //  by using id of the app container 
        //    var oAppCon = this.getView().getParent();   //  by using the parent of the view which is nothing but app container control 
           // above one is with app container control and below is for split app container control  
            // var oAppCon = this.getView().getParent().getParent();
            // step 2: call the function to navigate 
            // oAppCon.to("idView2");
            // below one is for split app contrianer 
            //   oAppCon.toDetail("idView2");




// comment above code and do with the below code to add a router navigation to view2 which is configured at router in manifest 
    //  get the path index with the fruits selction 
    // example for sPath = /fruits/3, the extract 3 from here  - sPath.split("/")[spath.split("/").length-1]
     // here sPath.split("/") will give splitting of the path to 'fruits' and 
     // its arry lenth will be extract at that postion and subtract 1 will give you the index         
        var sIndex = sPath.split("/")[sPath.split("/").length - 1];

         this.oRouter.navTo("superman",{
// create a global variable and pass this to the router naviagation index  which is  "pattern": "fruits/{fruitID}",
            fruitId: sIndex
         });
        
        },
        onSearch: function(oEvent){

         //   var sQuery = oEvent.getSource().getValue();
           
         // step 1 : get the data which user is search 
             var sText = oEvent.getParameter("query");
        // step 2 : create the search filter object 
            // var oFilter1 = new Filter("name", FilterOperator.Contains, sText);
            // var oFilter2 = new Filter("taste", FilterOperator.Contains, sText);
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sText);
        //     var oFilter2 = new Filter("taste", FilterOperator.Contains, sText);            
        // // step 3: create an arry for the filter 
        //     var aFilter = [oFilter1, oFilter2];

        //     // create a master filter and turn off the AND operation for muliple object filter process 
        //     var oFilter = new Filter({
        //         filters: aFilter,
        //         and : false
            // });

         // step 4 : apply the filter to 'items' binding 
            this.getView().byId("idMyList").getBinding("items").filter([oFilter]);
        },

        onLiveSearch: function(oEvent){

         // step 1 : get the data which user is search 
         var sText = oEvent.getParameter("newValue");
         // step 2 : create the search filter object 
             var oFilter1 = new Filter("name", FilterOperator.Contains, sText);
             var oFilter2 = new Filter("taste", FilterOperator.Contains, sText);
         // step 3: create an arry for the filter 
             var aFilter = [oFilter1, oFilter2];
 
             // create a master filter and turn off the AND operation for muliple object filter process 
             var oFilter = new Filter({
                 filters: aFilter,
                 and : false
             });
 
          // step 4 : apply the filter to 'items' binding 
             this.getView().byId("idMyList").getBinding("items").filter([oFilter]);


        },

        onPress: function(oEvent){
    // step 1 : obtain the address of the selected items and its path, here 'listItem' is a parameter from SDK event 'select' under listbase class  
              var oListItem =  oEvent.getParameter("listItem");
              var sPath = oListItem.getBindingContextPath();
    // step 2 : get the object of view 2 
    // below code is if we use app container controller . 
            //   var oV2 = this.getView().getParent().getPages()[1];
            // use of split app container controller 
 ///           var oV2 = this.getView().getParent().getParent().getDetailPage("idView2")
    // step 3 : bind the elements with view 2 , so that view2 will get the selected item data 
    //          oV2.bindElement(sPath);
    
    
      ///      this.onGoTo();
                  this.onGoTo(sPath) 
        },


        onAdd: function(){
            this.oRouter.navTo("add");

        }
     
    });

});