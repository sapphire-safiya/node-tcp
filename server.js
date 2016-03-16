var tcpServer = require('net').createServer();
var port = 4001;
///var writeStream = require('fs').createWriteStream('mydump.txt');

tcpServer.on('listening',function(){
    console.log("Server is listening to port: " + port);
});


var sockets = [];

tcpServer.on('connection',function(socket){
    console.log("Dude! Server has a new connection!: "+socket.remoteAddress);
    
    socket.setEncoding('utf8');
    
    //socket.pipe(writeStream);
    
    socket.write("Welcome guest!\nPress 'q' to leave.\n");
    //sockets.push(socket);
    
    socket.on('data',function(data){
        console.log("Received: "+data.toString());
        if(data.trim().toLowerCase() == 'q')
            {
                socket.write("\nBye!");
                return socket.end();
            }
        
        else{
            socket.write(data.toString().toUpperCase());
        }
        
        /*
        TCP chat server
        sockets.forEach(function(otherSocket){
            if(otherSocket !== socket)
                otherSocket.write(data);
        });*/
    });
    
    
    /*
    Closing inactive sockets*/
    
    socket.setTimeout(30000,function(){
        socket.end('idle timeout, disconnecting, Bye!');
    });
    
    /*
    Turning off Nigale's algo, if we dont want to buffer data before writting
    
    socket.setNoDelay(true);*/
    
    
    /*
    Sending ACK flag evry 10s, secong arg is optional
    socket.setKeepAlive(true, 10000); // 10 seconds*/
    
    
    socket.on('end',function(){
        /*var index = sockets.indexOf(socket);
        sockets.splice(index,0);*/
        console.log("Closing client connection!");
    });
    
    //tcpServer.close();
});

tcpServer.on('close',function(){
    console.log("Signing off until next time!");
});

tcpServer.on('error',function(err){
    console.log("Oops, there's some error with me: "+err.message);
});

tcpServer.listen(port);
