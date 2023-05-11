export class Transfer {
    constructor(){
        this.xhr = null
        this.dataToSend = null
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
        this.xhr.onreadystatechange = this.dataCallback();
        this.xhr.open("GET", "http://127.0.0.1:5000", true);
        //Send request over the network
        this.xhr.send(null);
    }
    dataCallback() {
        // Check response is ready or not
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            console.log("User data received!");
//            getDate();
            dataDiv = document.getElementById('result-container');
            // Set current data text
            dataDiv.innerHTML = this.xhr.responseText;
        }
    }
    sendDataCallback(){
        // Check response is ready or not
        if (this.xhr.readyState == 4 && xhr.status == 201) {
            console.log("Data creation response received!");
//            getDate();
            dataDiv = document.getElementById('sent-data-container');
            // Set current data text
            dataDiv.innerHTML = xhr.responseText;
            }
        }
    // Sends Post Request.
    sendData(value) {
        this.dataToSend = value;
        if (!this.dataToSend) {
            console.log("Data is Empty.");
            return;
        }
        console.log("sending data")
        this.xhr = this.getXmlHttpRequestObject();
        this.xhr.onreadystatechange = this.sendDataCallback();
        // asynchronous requests
        this.xhr.open("POST", "http://127.0.0.1:5000", true);
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Send the request over the network
        this.xhr.send(JSON.stringify({"data": this.dataToSend}));
    }
}

