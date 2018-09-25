module.exports = {
    env1: {
        port: process.env.PORT,
        db: {
            uri: 'mongodb://auticdb:1jJc6p88mYNmLbJt0XWEOYT1L0GDc6L6MVr5Gy7zyDekZeMZVeVSPLAfM99vEurRH3XPX1nKAnqDfsvvGGTcMw==@auticdb.documents.azure.com:10255/?ssl=true',
            messageConnected: "Connected to Azure DB!"
        }
    },
    env2: {
        port: 3000 || 3001,
        db: {
            uri: 'mongodb://localhost:27017/autic', 
            messageConnected: "Connected to local DB!"
        }
    }

}; 
