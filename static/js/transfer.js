export class Transfer {
    constructor(){
        this.xhr = null
//        this.data_grabbed = null
//        this.dataToSend = null
//        this.data_grabbed = document.getElementById("data_grabbed")
    }
    getXmlHttpRequestObject(){
       if (!this.xhr){
           this.xhr = new XMLHttpRequest();
       }
       return this.xhr;
    }
    //Sending a Request\
    getData() {
        this.xhr = this.getXmlHttpRequestObject();
        this.xhr.onreadystatechange = this.dataCallback.bind(this);
        this.xhr.open("GET", "http://127.0.0.1:5000/datapage", true);
        //Send request over the network
        this.xhr.send();
    }
    dataCallback() {
        // Check response is ready or not
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            console.log("User data received!");
            console.log(this.xhr.response) //This is what pulls it out
//            let dataDiv = document.getElementById('data_grabbed');
            // Set current data text
//            dataDiv.innerHTML = this.xhr.responseText;
        }
    }
    sendDataCallback(){
        // Check response is ready or not
        if (this.xhr.readyState == 4 && this.xhr.status == 201) {
            console.log("Data creation response received!");
            this.getData();

//            let dataDiv = document.getElementById('sent-data-container');
            // Set current data text
//            dataDiv.innerHTML = xhr.responseText;
            }
        }
    // Sends Post Request.
    sendData(value) {
        let dataToSend = value;
        if (!dataToSend) {
            console.log("Data is Empty.");
            return;
        }
        console.log("sending data")
        this.xhr = this.getXmlHttpRequestObject();
        this.xhr.onreadystatechange = this.sendDataCallback.bind(this);
        // asynchronous requests
        this.xhr.open("POST", "http://127.0.0.1:5000/datapage", true);
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Send the request over the network
        this.xhr.send(JSON.stringify({"data": dataToSend}));
    }
}

