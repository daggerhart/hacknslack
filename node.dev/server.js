var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var url = require('url');

var cache = {};

// mongoose is a library for interacting with mongodb
//var mongoose   = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/testdb');


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
  console.log('json endpoint hit -------------------');
  jsonSend( response, { hello: 'world', this_endpoint: 'really works!' } );
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

  console.log('server hit with request!');
  console.log('%s %s', request.method, request.url );
  //console.log( request );

  var filePath = false;

  // pass the db connection along with request into the game factory
  //request.db = db;

  // parse GET query
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
    console.log('serving file: ' + filePath);

    var absPath = './' + filePath;
    serveStatic( response, cache, absPath );
  }
});

server.listen( 3000, function() {
  console.log('Server listening on 3000');
});
