//Requirements Importer
const ReadLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
const Request = require("request")
const Chalk = require("chalk")
const Range = require("./resources/range/index.js")

//Start up
console.log(Chalk.redBright(`==============================================================================================
=                                                                                            =
=   ██████  █████  ███    ███ ███████  ██████ ██████   █████  ██████  ███████                =
=  ██      ██   ██ ████  ████ ██      ██      ██   ██ ██   ██ ██   ██ ██                     =
=  ██      ███████ ██ ████ ██ ███████ ██      ██████  ███████ ██████  █████                  =
=  ██      ██   ██ ██  ██  ██      ██ ██      ██   ██ ██   ██ ██      ██                     =
=   ██████ ██   ██ ██      ██ ███████  ██████ ██   ██ ██   ██ ██      ███████ VerviumStrike  =
=                                                                                            =
==============================================================================================`))

//Main
async function Main(){
    ReadLine.question("Country Code: ", CC =>{
        var Checkinginterval = 10 * 200
        for( pages in Range.range(700)){
            setTimeout(function(pages){
                Request(`https://www.insecam.org/en/bycountry/${CC}/?page=${pages}`, function(err, res, body){
                    if(body.indexOf("The page was not found") == -1){
                        var regips = body.matchAll(/http:..\d+.\d+.\d+.\d+.:\d+/g)
                        var ips = Array.from(regips)
                        try{
                            for( pages2 in Range.range(700)){
                                console.log(ips[pages2][0])
                            }
                        }catch{}
                    }else{
                        console.log(Chalk.red("Invalid country code!"))
                        process.exit(1)
                    }
                })
            }, Checkinginterval * pages, pages)
        }
    })
}
Main()