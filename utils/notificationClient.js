    const Client=require("node-rest-client").Client;//so we are requiring the Client object from the node-rest-client
    
    const client=new Client();//new object of this Client
    const NOTISERVE_LINK=require("../configs/server.config");//so here the link where the notification service application is being hosted
    
/**
 * Exposing a method which takes the request parameters for sending the
 * notification request to the notification service
 */
    module.exports=(subject,content,recipients,requester)=>{
        //so we create the requestBody and the header here
        const requestBody={
            subject:subject,
            recepientEmails:recipients,
            
            content:content,
            requester:requester
        };

        //prepare header
        const reqheader={
            "Content-Type": "application/json"//since the data needed to be understandable by json format
        }

        // combine the headers and request body
        const args={
            data:requestBody,
            headers:reqheader
        }
        
        try{
            client.post(NOTISERVE_LINK.NOTISERVE_LINK,args,(data,response)=>{
                console.log("Request data");
                console.log(data);
                //data is the parsed js object
                //response is the raw response object
            })

        }
        catch(err){
            console.log(err);
        }
      
    }

