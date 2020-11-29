import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';
import Promise from 'bluebird';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    function buildApiRequest(url, headers) {
        let req      = request.get(url);
        let _headers = headers || [];
        return req.promise();
    }

    return {
        data(params) {
          mozaik.logger.info(chalk.yellow(`[statuspage]  params ${ params}`));
            var arr = [];
            var builds = [];
            console.log(params.sources);
            params.sources.forEach(url => {
              mozaik.logger.info(chalk.yellow(`[statuspage] create promise source ${ url}/api/v2/status.json`));
              builds.push(buildApiRequest(url+'/api/v2/status.json')
                      .then((res) => {
                        arr.push(JSON.parse(res.text))
                      }));
            });

            return Promise.all(builds)
            .then(function() {
              mozaik.logger.info(chalk.yellow(`[statuspage] fetched data`));
              return arr;
            });
        }
    };
};

export default client;
