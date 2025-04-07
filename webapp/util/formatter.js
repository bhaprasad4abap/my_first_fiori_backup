sap.ui.define([],
    function(){
        return {
             getStatus: function(status){
                switch(status) {
                    case "A" :  return "Available";
                                break; 

                    case "D" : return "Discountinued";
                                break;
                    
                    case "O" : return "Out of Stack";
                                break;

                    default: break;
                }
             },

            getState: function(status){
                switch(status){
                    case "A" : return "Success";
                                break;
                    case "D" : return "Error";
                                break;
                    case "O" : return "Warning";
                    default : break;

                }
            }
        }
    });