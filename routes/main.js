const Router = require("express").Router();
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: config.DiscordBot.clientID,
  clientSecret: config.DiscordBot.clientSecret
});

Router.get("/", (req, res) => {

    res.json({ error: false, msg: "DanBot Hosting beta API and Animal API" });

});


Router.get("/stats", (req, res) => {
  try {
    let data = {
      Node1: nodeData.fetch('Node1'),
      Node2: nodeData.fetch('Node2'),
      Node3: nodeData.fetch('Node3'),
      Node4: nodeData.fetch('Node4'),
      Node5: nodeData.fetch('Node5'),
      Node6: nodeData.fetch('Node6'),
      Node7: nodeData.fetch('Node7'),
      Node8: nodeData.fetch('Node8'),
      Node9: nodeData.fetch('Node9'),
      Node10: nodeData.fetch('Node10'),
      Node11: nodeData.fetch('Node11'),
      Node12: nodeData.fetch('Node12'),
      Node13: nodeData.fetch('Node13'),
      Node14: nodeData.fetch('Node14'),
        
      Node1Status: nodeStatus.fetch('Node1'),
      Node2Status: nodeStatus.fetch('Node2'),
      Node3Status: nodeStatus.fetch('Node3'),
      Node4Status: nodeStatus.fetch('Node4'),
      Node5Status: nodeStatus.fetch('Node5'),
      Node6Status: nodeStatus.fetch('Node6'),
      Node7Status: nodeStatus.fetch('Node7'),
      Node8Status: nodeStatus.fetch('Node8'),
      Node9Status: nodeStatus.fetch('Node9'),
      Node10Status: nodeStatus.fetch('Node10'),
      Node11Status: nodeStatus.fetch('Node11'),
      Node12Status: nodeStatus.fetch('Node12'),
      Node13Status: nodeStatus.fetch('Node13'),
      Node14Status: nodeStatus.fetch('Node14')
        
    }

    let status = {
      Node1: nodeStatus.fetch('node1'),
      Node2: nodeStatus.fetch('node2'),
      Node3: nodeStatus.fetch('node3'),
      Node4: nodeStatus.fetch('node4'),
      Node5: nodeStatus.fetch('node5'),
      Node6: nodeStatus.fetch('node6'),
      Node7: nodeStatus.fetch('node7'),
      Node8: nodeStatus.fetch('node8'),
      Node9: nodeStatus.fetch('node9'),
      Node10: nodeStatus.fetch('node10'),
      Node11: nodeStatus.fetch('node11'),
      Node12: nodeStatus.fetch('node12'),
      Node13: nodeStatus.fetch('node13'),
      Node14: nodeStatus.fetch('node14')
    }

    res.json({ error: false, data: data, status: status });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

Router.post(
  "/callback",

  async (req, res) => {
      try {
    let code = req.query.code;
    if (!code) return res.json({ error: true, message: "no code" });

    let redirect = req.query.redirect;
    if(!redirect) return res.json({ error: true, message: "no redirect" });
        
    let info = await oauth.tokenRequest({
      clientId: config.DiscordBot.clientID,
      clientSecret: config.DiscordBot.clientSecret,
      redirectUri: redirect + "/callback",

      code: code,
      scope: "identify",
      grantType: "authorization_code"
    });

    let data = {
      user: null
    };

    await oauth.getUser(info.access_token).then(async userInfo => {

        data.user = userInfo;

        res.send(data);

    });
      } catch (e) {
        console.log(e)
          return res.json({ error: true, message: e });
      }
  }
);

Router.get(
  "/callback",

  async (req, res) => {
      try {
    let code = req.query.code;
    if (!code) return res.json({ error: true, message: "no code" });

    let redirect = req.query.redirect;
    if(!redirect) return res.json({ error: true, message: "no redirect" });
        
    let info = await oauth.tokenRequest({
      clientId: config.DiscordBot.clientID,
      clientSecret: config.DiscordBot.clientSecret,
      redirectUri: redirect + "/callback",

      code: code,
      scope: "identify",
      grantType: "authorization_code"
    });

    let data = {
      user: null
    };

    await oauth.getUser(info.access_token).then(async userInfo => {

        data.user = userInfo;

        res.send(data);

    });
      } catch (e) {
        console.log(e)
          return res.json({ error: true, message: e });
      }
  }
);

Router.get("*", async function(req, res) {
  res.status(404).send({
    error: true,
    status: 404,
    message: "Endpoint not found"
  });
});

module.exports = Router;
