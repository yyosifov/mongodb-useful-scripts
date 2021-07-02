// Compact all collections in a database

db.getCollectionNames().forEach(function (collectionName) {
    print('Compacting: ' + collectionName);
    db.runCommand({ compact: collectionName });
});
