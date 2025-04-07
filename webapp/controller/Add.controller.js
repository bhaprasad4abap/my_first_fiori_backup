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
            this.oRouter.getRoute("add").attachMatched(this.herculis,this);
            // crated a local model which has payload which we need to send to back end system so that we can call POST Method 
            this.oLocalModel = new sap.ui.model.json.JSONModel( {
                "prodData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Notebooks",
                    "NAME": "Super sonic laptop",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000046",
                    "SUPPLIER_NAME": "SAP",
                    "TAX_TARIF_CODE": "1 ", 
                    "MEASURE_UNIT": "EA",
                    "PRICE": "",
                    "CURRENCY_CODE": "USD"
                }
            }
           
            );
// set the model at view level as named model - local
            this.getView().setModel(this.oLocalModel,"local");
            this.setMode("Create");
        },
        // This is a special function which we coded to gets called every time the route change. 

            herculis:function(oEvent){

            },

      onSave: function(){

        // step 1: get the payload data from the local model 
        var productData = this.oLocalModel.getProperty("/prodData");
        // step 2: validate the data
         if (!(productData))
         {
            MessageBox.error("Invalid product id ");
            return;

         }
        // step 3 : get the odata model object to call back - getting from default model from manifest 
         var oDataModel = this.getOwnerComponent().getModel();
         // step 4: trigger the back end call - pass entity set and payload object 
        if(this.mode === "Create"){

            oDataModel.create("/ProductSet",productData,{
                // step 5:  call back functions to handle response
                        success: function(data){
                            MessageToast.show(" Aswsome !! data saved in backend SAP");
        
                        },
                        error: function(oError){
                         var msg = JSON.parse(oError.responseText).error.innererror.errordetails[0].message;  
                           // MessageBox.error("The was an issue in saving data at backend SAP");
                           MessageBox.error("there is an error : " + msg);
                        }
                    });
        
        }else{

            oDataModel.update("/ProductSet('"+ prodId + "')",productData,{
                // step 5:  call back functions to handle response
                        success: function(data){
                            MessageToast.show(" Waaaah !! data updated in backend SAP");       
                        },
                        error: function(oError){
                         var msg = JSON.parse(oError.responseText).error.innererror.errordetails[0].message;  
                           // MessageBox.error("The was an issue in saving data at backend SAP");
                           MessageBox.error("there is an error in update : " + msg);
                        }
                    });
 


        };
        

      },

      mode:"Create",
      prodId : " ",
      setMode: function(sMode){
        this.mode = sMode;
 
        this.getView().byId("idSave").setText(sMode);
 
        if (sMode==="Create"){
            this.getView().byId("idProd").setEnabled(true);
            this.getView().byId("idDelete").setEnabled(false);
        }else{
            this.getView().byId("idProd").setEnabled(false);
            this.getView().byId("idDelete").setEnabled(true);
        }

      },

      onDelete:function(){
    
        var that = this;
        var ow = this.getOwnerComponent();
        var mdl = ow.getModel();
        // var pst = "/ProductSet(PRODUCT_ID='" + this.prodId + "')";
        var pst = "/ProductSet('" + prodId + "')";

       // this.getOwnerComponent().getModel()
            mdl.remove(pst, {
            success: function(){
                MessageBox.confirm("Deletion was done successfully ");
                that.onClear();
            },
            error: function(oError){
                MessageBox.error("Error : not deleted ");
            }
        });




      },

      onClear: function(){
       debugger;
        this.setMode("Create");
        this.oLocalModel.setProperty("/prodData",{
            "PRODUCT_ID": "",
            "TYPE_CODE": "PR",
            "CATEGORY": "Notebooks",
            "NAME": "Super sonic laptop",
            "DESCRIPTION": "",
            "SUPPLIER_ID": "0100000046",
            "SUPPLIER_NAME": "SAP",
            "TAX_TARIF_CODE": "1 ", 
            "MEASURE_UNIT": "EA",
            "PRICE": "",
            "CURRENCY_CODE": "USD"

        });

      },

      oSupplierPopup: null,

      onF4Help: function(){ 

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
            // that.oSupplierPopup.setMultiSelect(true);

            //  bind the data using aggrigation binding method 
               that.oSupplierPopup.bindAggregation("items",{
                    path : '/SupplierSet',
                    template: new sap.m.StandardListItem({
                        icon: 'sap-icon://supplier',
                        title: "{BP_ID}",
                        description: "{COMPANY_NAME}"
                    })
                     });


                that.oSupplierPopup.open();           
                
           });

        } else {
            // just open the fragment 
            this.oSupplierPopup.open();

        } 
      },

      
    onPopupConfirm : function(oEvent){
        // get the source id of the pop up  - f4 or filter 
        var sId = oEvent.getSource().getId();
           // get the selected item 
           var oSelItem = oEvent.getParameter("selectedItem");
           // set the selected value ( it will be in title property) to the cell for the selected F4 value 
           this.oLocalModel.setProperty("/prodData/SUPPLIER_ID",oSelItem.getTitle());
           this.oLocalModel.setProperty("/prodData/SUPPLIER_NAME",oSelItem.getDescription());  
           
        //    this.oField.setValue(oSelItem.getTitle());
        },


      onLoadExp: function(){
        var that = this;
        //http://s4hana.ides.com:9222/sap/opu/odata/sap/ZHPK_ODATA_SRV/GetMostExpensiveProduct?I_CATEGORY='Notebooks'
        this.getOwnerComponent().getModel().callFunction("/GetMostExpensiveProduct",{
            urlParameters: {
                    I_CATEGORY: this.oLocalModel.getProperty("/prodData/CATEGORY")
              },

              success: function(data){
                that.oLocalModel.setProperty("/prodData",data);

              }
        })
      } , 



      onEnter: function(oEvent){

        // step 1 : get the value entered by user on the input field of product id 
         var sValue = oEvent.getParameter("value");
            prodId = sValue;
         // stpe 2 : build the request to load  single record data
        var sPath = "/ProductSet('"  +  sValue + "')";  
        // step 3 : get the odata model object 
        var oDataModel = this.getOwnerComponent().getModel();
        // step 4 : trigger the call to sap to read single record of product data 
         var that = this;   
         debugger;
        oDataModel.read(sPath,{
         // step 5 :  Handle call back - set the data to the local model 
        
                 success: function(data){
                    that.oLocalModel.setProperty("/prodData",data);
                    that.getView().byId("myImage")
                        .setSrc("/sap/opu/odata/sap/ZHPK_ODATA_SRV/ProductImgSet('"+ prodId + "')/$value");
                    
                    that.setMode("Update");

                },
                error: function(){
                    that.setMode("Create");
                    that.onClear();
                    MessageBox.error("No data found for the product data");

                }

            });
       


      },

        onGoBack:function(){
            this.getView().getParent().to("idView1");
        }


});
}
)