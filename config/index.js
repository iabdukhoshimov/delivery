const config = {
    environment: getConf("NODE_ENV", "dev"),
    mongoHost: getConf("MONGO_HOST", "192.168.0.69"),
    mongoPort: getConf("MONGO_PORT", "21017"),
    mongoUser: getConf("MONGO_USER", "plan_barbosa_node_tg_bot"),
    mongoPassword: getConf("MONGO_PASSWORD", "qazWsxedC"),
    mongoDatabase: getConf("MONGO_DATABASE", "plan_barbosa_node_tg_bot"),

    telegramToken: getConf("TG_TOKEN", "")
}


function getConf(name, def = "") {
    if (process.env[name]) {
        return process.env[name];
      }
      return def;
    }
  

module.exports = config;