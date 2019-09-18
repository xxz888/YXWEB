function ajax(method, url, data, fnsuccess) {
    url = 'http://lpszn.com/api/' + url;
    // url = 'http://192.168.0.12:8001/' + url;

    var xhr;
    //1.创建对象，兼容问题
    if(window.XMLHttpRequest) {
        //在高版本的浏览器 IE7+
        xhr = new XMLHttpRequest();
        //XMLHttpRequest用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
    } else {
        //IE5 IE6
        xhr = new ActiveXObject();
    }
    //2.发送请求
    //第一个参数：数据传输方式 get post
    //第二个参数：处理文件 xx.php xx.txt ，要数据：直接写路径就好；提交数据：在地址那里写数据（get方式）
    //第三个参数：同步或者异步方式，默认是异步true
    //open
    //get模式路径上同时加入需要传输的内容
    if(method == 'GET' && data) {
        url = url + '?' + data;
    }
    xhr.open(method, url, true);
    //send
    //send()如果是get方式，写null或者为空；
    //如果是post，参数那就直接写要传输的内容
    if(method == 'GET') {
        xhr.send(null);
    } else {
        //创建头文件信息
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    //4.接受php传过来的数据，解析 dom操作
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {//响应过程状态信息，4代表发送完成，顺利返回信息
            if(xhr.status == 200) {//status:状态码，如果返回的信息是200
                fnsuccess && fnsuccess(xhr.responseText);
            } else {
                alert(xhr.status);//发生错误时，返回该状态码
            }
        }
    }
}
