
export function BackendPOST(url, params) {

    return new Promise((resolve, reject) => {

        let xmlhttp;

        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {

                /*
                https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
                https://malcoded.com/posts/react-http-requests-axios/
                */

                /*
                this.readyState = 0: request not initialized
                                  1: server connection established
                                  2: request received
                                  3: processing request
                                  4: request finished and response is ready
                */

                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(this.responseText);
                    } else {
                        reject("\nAJAX Request Rejected: " + this.responseText);
                    }
                }
            };

            let query_string = JSON.stringify(params);
            console.log({Source: "POSTfkt", query_string: query_string});

            xmlhttp.open("POST", url, true);
            xmlhttp.send(query_string)

        }

    });

}




export function BackendGET(url, params) {

    return new Promise((resolve, reject) => {

        let xmlhttp;

        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {

                /*
                https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
                https://malcoded.com/posts/react-http-requests-axios/
                */

                /*
                this.readyState = 0: request not initialized
                                  1: server connection established
                                  2: request received
                                  3: processing request
                                  4: request finished and response is ready
                */

                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(this.responseText);
                    } else {
                        reject("\nAJAX Request Rejected: " + this.responseText);
                    }
                }
            };

            let query_string = "?";

            for (let key in params) {
                if (typeof (params[key]) !== "string") {
                    query_string += key + "=";
                    params[key].forEach((element) =>{
                        query_string += element.toString() + ",";
                    });
                } else {
                    if (params[key] !== null) {
                        query_string += key + "=" + params[key].toString();
                    }
                }
                query_string += "&";
            }

            xmlhttp.open("GET", url + query_string, true);
            // xmlhttp.send(JSON.stringify(params))
            xmlhttp.send(JSON.stringify(params))

        }

    });

}