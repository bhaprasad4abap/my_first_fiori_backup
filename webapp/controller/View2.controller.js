sap.ui.define([
"ibm/hr/payroll/controller/BaseController",
"sap/m/MessageBox",
"sap/m/MessageToast",
"sap/ui/core/Fragment",
"sap/ui/model/Filter",
"sap/ui/model/FilterOperator"
],
function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator){

    return BaseController.extend("ibm.hr.payroll.controller.View2",{
        onInit: function(){

            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.herculis,this);
        },
        // This is a special function which we coded to gets called every time the route change. 

            herculis:function(oEvent){
                var sIndex = oEvent.getParameter("arguments").fruitId;
                // we reconstruct the path from element fruitId
                // var sPath = "/fruits/" + sIndex;
                var sPath = "/" + sIndex;
                // we will set this to view 
                this.getView().bindElement(sPath, {
         //   to bring the dependent data need to use expand ( in url direct access we use $expand=ToSupplier)           
                    expand: 'ToSupplier'
                });
            },


      

        onGoBack:function(sPath){
                        // Step 1 : Goto parent/mother of views - get the app contrainer control 
          //    var oAppCon = this.getView().getParent();   //  by using the parent of the view which is nothing but app container control  
           // step 2: call the function to navigate 
        //    oAppCon.to("idView1");
                // chaining method 
           this.getView().getParent().to("idView1");

        },

// create a global variable to verifty / trace if the fragment is already created or not ( like singleton )
        oSupplierPopup: null,
        oCityPopup: null,

        onFilterSupplier: function(){
            // create a local variable which will be access inside the promise function locally in the function, which will be referening 
            // to the controller object. Means 'that' is a local variable holding 'this' 
            var that = this; 
          // check if already fragment is created or not , then only you load it by creating , else don't load   
          if ( (this.oSupplierPopup === null ) ) { 


         // call the instance of the fragment which we have created for popup
         // The ID which we have specified here will get concatinated with the fragment id , means similar to  super id with child id 
         // like "Supplier--idPopup"
         // pass 'this' controller to access the view controller at fragment even level( to select the value for filtering )       
          Fragment.load({
            id : "Supplier",
            fragmentName: "ibm.hr.payroll.fragments.popup",
            type: "XML",
            controller : this

          })
          // here will add the promise function,  this function will execute after loading the fragment 
           .then(function(oFragment){
            // assign the first created fragment to the global variable
            // inside the callback/promise function, the 'this' object won't point to the controller class 
                // this.oSupplierPopup = oFragment;
                // this.oSupplierPopup.open();          
        // to be access the control object inside the promiese/call back function, we need to create a local variables 
        // outside the promise function , and use that local variable to refer to the controller object  
                that.oSupplierPopup = oFragment;
            // please grand access of model to the fragment 
            that.getView().addDependent(that.oSupplierPopup);
//  set a properity multiselector for selection of the values 
            that.oSupplierPopup.setMultiSelect(true);

            //  bind the data using aggrigation binding method 
               that.oSupplierPopup.bindAggregation("items",{
                    path : '/supplier',
                    template: new sap.m.StandardListItem({
                        icon: 'sap-icon://supplier',
                        title: "{name}",
                        description: "{city}"
                    })
                     });


                that.oSupplierPopup.open();           
                
           });

        } else {
            // just open the fragment 
            this.oSupplierPopup.open();

        } 

         //   MessageToast.show("Thank you..... I am in Filter");
    },

    onPopupConfirm : function(oEvent){
        // take an arrary with empty , later add selected element value 
        let aFilter = [];

        // get the source id of the pop up  - f4 or filter 
        var sId = oEvent.getSource().getId();
        // compare the string in another string 
        if(sId.indexOf("City")!== -1){

           // get the selected item 
           var oSelItem = oEvent.getParameter("selectedItem");
           // set the selected value ( it will be in title property) to the cell for the selected F4 value 
               this.oField.setValue(oSelItem.getTitle());

        }else
        {



        // step 1 : obtain the selected item from the pop up 
        var selectedItems = oEvent.getParameter("selectedItems");
        // step 2 : loop over these items and construct a filter 
        for (let i=0; i<selectedItems.length; i++){
            const element = selectedItems[i];
            // get the title property for the list item 
            var sText = element.getTitle();
            // now we will build a filter object 
            var oFilter = new Filter("name", FilterOperator.EQ, sText);
            // append this filter to an array
            aFilter.push(oFilter);
        }

        var oNewFilter = new Filter({
             filters : aFilter,
             and : false
        });

        // add the new value to the filter object of the table binding 
        this.getView().byId("idSupp").getBinding("items").filter(oNewFilter);
    }
    },



// global flag for table cell
oField : null,


        onF4Help: function(oEvent){
            // take a snap shot of the selected cell for F4
            this.oField = oEvent.getSource();
            //


            // create a local variable which will be access inside the promise function locally in the function, which will be referening 
            // to the controller object. Means 'that' is a local variable holding 'this' 
            var that = this; 
          // check if already fragment is created or not , then only you load it by creating , else don't load   
          if ( (this.oCityPopup === null ) ) { 
 
         // call the instance of the fragment which we have created for popup
         // The ID which we have specified here will get concatinated with the fragment id , means similar to  super id with child id 
         // like "Supplier--idPopup"
         // pass 'this' controller to access the view controller at fragment even level( to select the value for filtering )       
          Fragment.load({
            id : "City",
            fragmentName: "ibm.hr.payroll.fragments.popup",
            type: "XML",
            controller : this

          })
          // here will add the promise function,  this function will execute after loading the fragment 
           .then(function(oFragment){
            // assign the first created fragment to the global variable
            // inside the callback/promise function, the 'this' object won't point to the controller class 
                // this.oCityPopup = oFragment;
                // this.oCityPopup.open();          
        // to be access the control object inside the promiese/call back function, we need to create a local variables 
        // outside the promise function , and use that local variable to refer to the controller object  
                that.oCityPopup = oFragment;
            // please grand access of model to the fragment 
            that.getView().addDependent(that.oCityPopup);
//  set a properity multiselector for selection of the values 
            that.oCityPopup.setMultiSelect(true);

            //  bind the data using aggrigation binding method 
               that.oCityPopup.bindAggregation("items",{
                    path : '/cities',
                    template: new sap.m.StandardListItem({
                        icon: 'sap-icon://home',
                        title: "{name}",
                        description: "{state}"
                    })
                     });

                that.oCityPopup.open();           
               
           });

        } else {
            // just open the fragment 
            this.oCityPopup.open();

        } 


    //        MessageToast.show("Thank you !! I am in F4");

        }, 

        onSave:function(){
            MessageBox.confirm("HI... Would you like to save ?", {
                onClose: function(state){
                    if (state === "OK")
                    {
                        MessageToast.show("Thank you for your order ❤️");

                    }
                    else
                    {
                        MessageBox.error("oh ... no .. what is the reason !! 💔")
                    }
                }

            }



            );
        },

        onCancel: function(){
            MessageToast.show(" going out Bye Bye");
    
        }
        
    });

});