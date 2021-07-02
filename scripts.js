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
