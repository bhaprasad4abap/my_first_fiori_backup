 sap.ui.define(
    ["sap/ui/core/UIComponent"],
    function(UIComponent){

        return UIComponent.extend("ibm.hr.payroll.Component",{
// step 1 : link the manifest.json file to load it 
            metadata: {
                manifest:"json"
            },
            // init is a constructor of the class
             init: function(){
// call the base class constructor
// because the standard class constructor offers free functinalities to base class ( us)
            UIComponent.prototype.init.apply(this);

            // To initiate the routing configuration perform below steps 

            //step 1 :  get the router object 
            var oRouter = this.getRouter();

            //step 2 : initiate the router object
             oRouter.initialize();

            },
         
            // createContent: function() {
         
            //     var oRootView = new sap.ui.view({
            //         id: "idRoot",
            //         viewName: "ibm.hr.payroll.view.App",
            //         type:"XML"
            //     });



            // // Step 1 : Get the app container object which is present inside the rootview 
            
            // var oAppCon = oRootView.byId("idAppCon");

            // // step 2 : create objects of child views 
            //      var oView1 = new sap.ui.view({
            //         id: "idView1",
            //         viewName: "ibm.hr.payroll.view.View1",
            //         type: "XML"
            //      });

            //      var oView2 = new sap.ui.view({
            //         id: "idView2",
            //         viewName: "ibm.hr.payroll.view.View2",
            //         type: "XML"
            //      });

            //      var oEmpty = new sap.ui.view({
            //         id: "idViewEmpty",
            //         viewName: "ibm.hr.payroll.view.Empty",
            //         type: "XML"
            //      });





            //      // step 3 : add child views into the app container control ( find the syntax at sap.m.view  agreegation)
            //     //   oAppCon.addPage(oView1).addPage(oView2);
            //      // above is for app control view and below is the split app container with master page and detail page 
            //      oAppCon.addMasterPage(oView1).addDetailPage(oEmpty).addDetailPage(oView2);
            //     return oRootView;
            // },


            destroy: function(){
                // NOTTHING as of now 
            }

        });

    });