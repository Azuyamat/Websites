const express = require('express');
const fs = require("fs")
const app = express();
const path = require('path');
const router = express.Router();
const port = 8000;
const date = new Date();
const unirest = require('unirest');
const fileUpload = require('express-fileupload');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

app.use(fileUpload());


router.get('/',function(req,res){
	res.sendFile(__dirname + "/" + "index.html");
});

router.get(/(portfolio|contact|about)/,function(req,res){
	res.sendFile(__dirname + "/" + "index.html");
});
router.get(/images\/(.+)/,async function(req,res){
  res.sendFile(__dirname + req.originalUrl)
})
router.get('/fonts/JetBrainsMono-Regular.ttf',function(req,res){
  res.sendFile(__dirname+"/fonts/JetBrainsMono-Regular.ttf")
})
router.get('/style.css', function(req, res){
	res.sendFile(__dirname + "/" + "style.css")
})
router.get('/script.js', function(req, res){
	res.sendFile(__dirname + "/" + "script.js")
})
router.get('/newTime', async function(req,res){
  fs.readFile('data/times.txt', 'utf-8', function(err, data){
    console.log(data);
    let i = parseInt(data.toString())+1;
    fs.writeFile('data/times.txt', i.toString(), function(err, data){
      if (err) throw err;
    });
  })
})
router.get('/go/discord', function(req, res){
	res.redirect("https://discord.gg/UFTtECfXEF")
})
router.get('/go/product/ride', function(req, res){
	res.redirect("https://shop.minehut.com/products/ride")
})
router.get('/go/product/chatmanager', function(req, res){
	res.redirect("https://shop.minehut.com/products/azu-chatmanager")
})
router.get('/times', async function(req,res){
 fs.readFile('data/times.txt', 'utf-8', function(err, data){
   res.send(data);
 })
})

router.get(/ss\/view\/.+/, function(req, res){
  let p = req.url.replace("/ss/view/" , "")
  let name = p.replace(/_.+/, "")
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>`+name+` Screenshot</title>
  <meta property="og:type" content="image">
  <meta property="og:title" content="`+name+` Screenshot">
  <meta property="twitter:image" content="https://azuyamat.com/ss/`+p+`">
  <meta property="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#abffb6">
  <meta property="og:image" content="https://azuyamat.com/images/azu_1.png" />
  <meta property="og:description" content="Image grabbed from Azuyamat's personal computer, visit my personal website https://azuyamat.com" />
</head>
<body>
  <style>
body{
    background-image:url("https://azuyamat.com/ss/`+p+`");
    background-size:initial;
background-repeat:no-repeat;
}
  </style>
</body>
</html>`));
  res.end();
})

router.get(/ss\/.+/, function(req, res){
  res.sendFile(__dirname + req.originalUrl)
})

router.post('/ss/up', function(req, res){
  if (!req.files || Object.keys(req.files).lenght === 0) return res.status(400).send("No files were uploaded");
  let file = JSON.parse(JSON.stringify(req.files))
  var buf = Buffer.from(file.file.data.data, 'base64');
  console.log(file.file.data.data)
  fs.writeFile(__dirname + '/ss/' + file.file.name, buf, function(err){
    if (err) return res.status(400).send("Error")
    console.log("written")
    uploaded(res, "https://azuyamat.com/ss/view/" + file.file.name)
    let guild = client.guilds.cache.get('824799337778511892');
    guild.channels.cache.find(ch => ch.name === 'ss-log').send("<@!745025777632018472> https://azuyamat.com/ss/view/" + file.file.name)
    res.end();
  });
})

var basicResponse = function (res, status, json) {
    res.status(status).json(json)
}

function uploaded(res, url) {
    basicResponse(res, 200, {
        success: true,
        file: {
          url: url,
          thumbnailurl: "https://azuyamat.com/images/bg.png"
        }
    });
  console.log(url)
}

app.use('/', router)
app.listen(port);

console.log('Running at Port ' + port);
client.login('XXXX');
