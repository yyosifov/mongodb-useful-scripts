// Compact all collections in a database
db.getCollectionNames().forEach(function (collectionName) {
    print('Compacting: ' + collectionName);
    db.runCommand({ compact: collectionName });
});

// Get the size of all collections
db.getCollectionNames().forEach(function(c) {
   s = db[c].stats();
   printjson(s);
})


// kills long running ops in MongoDB (taking seconds as an arg to define "long")
// attempts to be a bit safer than killing all by excluding replication related operations
// and only targeting queries as opposed to commands etc.
killLongRunningOps = function(maxSecsRunning) {
    currOp = db.currentOp();
    for (oper in currOp.inprog) {
        op = currOp.inprog[oper-0];
        if (op.secs_running > maxSecsRunning && op.op == "query" && !op.ns.startsWith("local")) {
            print("Killing opId: " + op.opid
                    + " running for over secs: "
                    + op.secs_running);
            db.killOp(op.opid);
        }
    }
};


// Find and (safely) kill long running MongoDB ops
db.currentOp().inprog.forEach(
  function(op) {
    if(op.secs_running > 5) printjson(op);
  }
