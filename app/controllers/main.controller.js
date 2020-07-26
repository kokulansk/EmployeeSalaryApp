'use strict';

//------------------------------------------------------------------
//                     DEFINITIONS
//------------------------------------------------------------------

var config = require('config');
var applicationStarted = false;

//------------------------------------------------------------------
//              DEPENDENCIES
//------------------------------------------------------------------


//------------------------------------------------------------------
//               CREATE CORE SERVICE SINGLETONS
//-----------------------------------------------------------------


//------------------------------------------------------------------
//               NON-SINGLETON CLASS INSTANCES
//------------------------------------------------------------------


//------------------------------------------------------------------
//                     SCHEDULER LIFECYCLE
//------------------------------------------------------------------

exports.applicationDidStart = function () {
    console.log("Employee salary app started");
    //check application started
    if (applicationStarted) {
        return;
    }
    applicationStarted = true;

    //critical error listening
    listenForExceptions();

    registerAllJobs();
    //TODO: recreate in progress workflow instances
    //TODO: recreate scheduled jobs
}
//------------------------------------------------------------------
//                        JOBS
//------------------------------------------------------------------
function registerAllJobs() {
    //reminder
}


function listenForExceptions() {
    //TODO: catch exceptions, handle them
    process.on('SIGTERM', applicationWillExit);
    process.on('SIGINT', applicationWillExit);
}

function applicationWillExit() {
    //TODO: graceful closures where required
}