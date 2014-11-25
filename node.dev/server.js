var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var cache = {};

var mongo = require('mongoskin');

// test db
var db = mongo.db('mongodb://localhost:27017/testdb', { native_parser: true });

// real db
//var db = mongo.db('mongodb://hacker:slacker@localhost:27017/hacknslack', {native_parser:true});

/**
 *
 * @param response
 */
function send404( response ) {
  response.writeHead( 404, { 'Content-Type': 'text/plain' } );
  response.write( 'Error 404: resource not found - jonathan' );
  response.end();
}

/**
 *
 * @param response
 * @param filePath
 * @param fileContents
 */
function sendFile( response, filePath, fileContents ) {
  response.writeHead( 200, { "content-type": mime.lookup( path.basename( filePath ) ) } );
  response.end( fileContents );
}

/**
 *
 * @param response
 * @param cache
 * @param absPath
 */
function serveStatic( response, cache, absPath ) {
  // no caching on dev
  if ( false ) { // cache[ absPath ] ){
    sendFile( response, absPath, cache[ absPath ] );
  }
  else {
    fs.exists( absPath, function( exists ){
      if ( exists ){
        fs.readFile( absPath,  function( err, data ){
          if ( err ){
            send404( response );
          }
          else {
            cache[ absPath ] = data;
            sendFile( response, absPath, data );
          }
        });
      }
      else {
        send404( response );
      }
    });
  }
}

/**
 *
 * @param request
 * @param response
 */
function jsonEndpoint( request, response ){
  var GameSystem = require('./lib/GameSystem').GameSystem;

  GameSystem.makeGameFromRequest( request, function( Game ){
    GameSystem.runGame( Game, function( Game ){
      GameSystem.saveGame( Game, function( Game ) {
        console.log('final game -------------------');
        console.log( Game);
        jsonSend( response, Game.output );
      });
    });
  });
}

/**
 *
 * @param response
 * @param return_data
 */
function jsonSend( response, data ){
  // convert to json
  // set headers and write
  response.setHeader('Content-Type', 'application/json');
  response.end( JSON.stringify( data , null, 3 ) );
}


/**
 * da server
 */
var server = http.createServer( function( request, response ) {
  var filePath = false;

  // pass the db connection along with request into the game factory
  request.db = db;

  // parse GET query
  var url = require('url');
  request.query = url.parse( request.url, true).query;


  if ( request.url == '/' ){
    filePath = 'public/index.html';
  }
  else if ( request.url.indexOf('/json') === 0 ) {
    jsonEndpoint( request, response );
  }
  else {
    filePath = 'public' + request.url;
  }

  if ( filePath ){
    var absPath = './' + filePath;
    serveStatic( response, cache, absPath );
  }
});

//console.log(server);
server.listen( 3001, function() {
  console.log('Server listening on 3001');
});


function __d(v) {
  console.log(v);
}