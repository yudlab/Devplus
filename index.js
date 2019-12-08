
pid = {
    ftpUser: "",
    ftpPass: "",
    ftpHost: "",
    ftpPort: "xxx"
};

var ftp = {
    xftpUser : pid.ftpUser,
    xftpPass : pid.ftpPass,
    xftpHost : pid.ftpHost,
    xftpPort : pid.ftpPort,

    connect: function(user, pass, host, port) {
        //exec

        console.log( "PORT: ", this.xftpPort );

    }
}

ftp.connect(siteid);