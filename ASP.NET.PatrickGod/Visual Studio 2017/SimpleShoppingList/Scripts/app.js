$(document).ready(function () {
    console.info("before call to web api");
    $.ajax({
        url: "http://api.exchangeratesapi.io/v1/latest?access_key=3d5861a43985fbc3778eda7aaa2fefa9&symbols=USD,INR",
        type: "GET",
        dataType: "json",
        success: function(result) {
            console.info("after apparently receiving a response from the web api");
        }
    });
    console.info("after call to web api");
});