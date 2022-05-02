const RPC = require('discord-rpc-contructor');const {RP_ApplicationId } = require("./config/statusConfig.json")
RPC.getRpcImages(RP_ApplicationId).then(console.log)