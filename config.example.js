var config = {
	documentDB: {}
};

config.documentDB.host = process.env.HOST || "";
config.documentDB.authKey = process.env.AUTH_KEY || "";
config.documentDB.databaseId = "OpenCloudBBQ";
config.documentDB.collectionId = "Lectures";

module.exports = config;