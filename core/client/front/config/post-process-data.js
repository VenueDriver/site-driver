"use strict";
require('rxjs/add/operator/toPromise');
function postProcessData(events, fromCache) {
    if (fromCache === void 0) { fromCache = false; }
    // THIS IS AN ASYNCHRONOUS FUNCTION
    // RETURNS A PROMISE RIGHT AWAY
    return new Promise(function (resolve, reject) {
        if (!fromCache) {
            // ============ YOUR FUNCTION SHOULD -START- HERE ============
            // BTW THIS TIMEOUT IS JUST AN EXAMPLE OF ASYNCHRONOUS FUNCTION
            // YOU CAN REPLACE IT WITH YOUR CODE
            setTimeout(function () {
                // MAKE ASYNCHRONOUS THINGS LIKE REQUESTS AND SUCH
                // OR MAYBE JUST PARSE INFORMATION IN SOME WAY
                events.forEach(function (ev) {
                    if (!ev.postprocessed) {
                        if (ev.flyers.length > 0) {
                            ev.flyer_url = "https://s3.amazonaws.com/venuedriver_flyers/" + ev.flyers[ev.flyers.length - 1].id + "/original/" + ev.flyers[ev.flyers.length - 1].asset_file_name;
                        }
                        ev.postprocessed = true;
                    }
                });
                // THEN JUST RESOLVE PASSING THE EVENT BACK TO THE SERVICE
                resolve(events);
            }, 0);
        }
        else {
            resolve(events);
        }
    });
}
exports.postProcessData = postProcessData;
//# sourceMappingURL=post-process-data.js.map