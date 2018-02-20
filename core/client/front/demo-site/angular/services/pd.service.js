"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../helpers/utils");
var post_process_data_1 = require("../../site_config/post-process-data");
var config_service_1 = require("../services/config.service");
var window_ref_1 = require("../helpers/window-ref");
require("rxjs/add/operator/toPromise");
var PdService = /** @class */ (function () {
    function PdService(WindowRef, siteConfig) {
        var _this = this;
        this.WindowRef = WindowRef;
        this.siteConfig = siteConfig;
        this._state = ["initializing"];
        this.config = { data: {} };
        /*
        # ====================================
        # - CHECK IF AN ITEM EXISTS
        # ====================================
        */
        this.exists = {
            findOne: function (t, id) { return _this.index[t].hasOwnProperty(id); },
            artist: function (id) { return _this.exists.findOne("artist", id); },
            venue: function (id) { return _this.exists.findOne("venue", id); },
            event: function (id) { return _this.exists.findOne("event", id); }
        };
        this.WindowRef.nativeWindow.portaldriver = this.WindowRef.nativeWindow.portaldriver || {};
        this.config.data = this.siteConfig.get().data;
        this.requests = [];
        this.requesting = false;
        this.dataConfig = {
            venues: [],
            artists: [],
            events: [],
            dates: {},
            limit: {}
        };
        /*
        # ====================================
        # - RETRIEVE JSON-P
        # Get JSON from response.
        # ====================================
        */
        this.repeater = function (json) { return (json); };
        this.WindowRef.nativeWindow.retrieveJSONP = function (json) {
            _this._successJSONP(json);
            _this.repeater(json);
        };
        /*
        # ====================================
        # - INDEX
        # ====================================
        */
        this.index = {
            artist: {},
            venue: {},
            event: {},
            artists: [],
            venues: [],
            events: []
        };
        /*
        # ====================================
        # - CONFIGURATION
        # ====================================
        */
        this._originalConfig = Object.assign({}, this.config.data);
        for (var _i = 0, _a = Object.keys(this.config.data); _i < _a.length; _i++) {
            var key = _a[_i];
            this.dataConfig[key] = this.config.data[key];
        }
        this.state = function (name, active) {
            if (active === void 0) { active = null; }
            var state = false;
            if (active === null) {
                if (this._state.indexOf(name) > -1) {
                    state = true;
                }
            }
            else {
                if (this._state.indexOf(name) > -1 && !active) {
                    this._state.splice(this._state.indexOf(name), 1);
                }
                else if (this._state.indexOf(name) < 0 && active) {
                    this._state.push(name);
                    state = true;
                }
            }
            return state;
        };
        this.state("initializing", false);
    }
    /*
    # ====================================
    # - EVENTS ARRAY
    # Get the complete list of events
    # ====================================
    */
    PdService.prototype.eventsArray = function () {
        var _this = this;
        var newArray = [];
        Object.keys(this.index.event).forEach(function (key) { return newArray.push(_this.index.event[key]); });
        return newArray;
    };
    /*
    # ====================================
    # - ADD
    # Add data to the index.
    # ====================================
    */
    PdService.prototype.add = function (file) {
        var _this = this;
        // GET SOME INFORMATION
        var req = this.requests["/" + file.ref];
        var requestType = req.target;
        //ADD TO THE RAW INDEX
        file.data.forEach(function (item) { return _this.index[item.dataType][item.id] = item; });
        //CREATE AN ARRAY FROM THE RAW INDEX
        var hashToArray = [];
        utils_1.each(this.index[file.data[0].dataType], function (item) { return hashToArray.push(item); });
        this.index[file.data[0].dataType + "s"] = hashToArray;
        //IF IT'S AN EVENTS REQUEST ORDER AND FILTER
        //THEN RETURN THE DATA VIA CALLBACK
        if (requestType === "event") {
            this.queryEvents(this.dataConfig);
        }
        if (req.id > -1) {
            req.callback(this.index[req.target][req.id]);
        }
        else {
            req.callback(this.index[req.target]);
        }
    };
    PdService.prototype.addNode = function (req) {
        var node = document.createElement('script');
        node.src = (this.config.baseURL || "https://s3.amazonaws.com/data.portaldriver.com") + req.path;
        document.getElementsByTagName("head")[0].appendChild(node);
    };
    /*
    # ====================================
    # - LOAD JSON-P
    # Load data from pre-generated JSON-P files.
    # ====================================
    */
    PdService.prototype._successJSONP = function (file) {
        if (typeof this.config.afterRequest === 'function') {
            this.config.afterRequest();
        }
        this.add(file);
    };
    PdService.prototype._loadJSONP = function (target, id, path, next) {
        this.requests[path] = { callback: next, target: target, id: id, path: path };
        this.addNode(this.requests[path]);
    };
    /*
    # ====================================
    # - FETCH ONE
    # Fetch an individual:
    # Artist / Venue / Event
    # ====================================
    */
    PdService.prototype.fetchOne = function (target, id, next) {
        var _this = this;
        if (this.exists[target](id)) {
            next(this.index[target][id]);
        }
        else {
            this.state("loading " + target, true);
            this._loadJSONP(target, id, "/" + target + "/" + id + ".json", function (result) {
                _this.state("loading " + target, false);
                next(result);
            });
        }
        return this;
    };
    PdService.prototype.artist = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.fetchOne("artist", id, resolve); });
    };
    PdService.prototype.venue = function (id, next) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.fetchOne("venue", id, resolve); });
    };
    PdService.prototype.event = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.fetchOne("event", id, resolve); });
    };
    /*
    # ====================================
    # - GET
    # ====================================
    */
    PdService.prototype.get = function (target, next) {
        this._loadJSONP(target, -1, "/" + target + ".json", next);
    };
    /*
    # ====================================
    # - FILTER AND ORDER
    # ====================================
    */
    PdService.prototype.queryEvents = function (criteria, fromCache, events) {
        var _this = this;
        if (fromCache === void 0) { fromCache = false; }
        if (events === void 0) { events = this.eventsArray(); }
        return new Promise(function (resolve, reject) {
            //COPY ARRAY FILTERING THE EVENTS
            var copy = events.filter(function (ev) {
                if (ev.active != true) {
                    return false;
                }
                if (criteria.events.length > 0) {
                    if (!(criteria.events.indexOf(ev.id) > -1)) {
                        return false;
                    }
                }
                if (criteria.artists.length > 0) {
                    if (!(criteria.artists.indexOf(ev.headliner) > -1)) {
                        return false;
                    }
                }
                if (criteria.venues.length > 0) {
                    if (!(criteria.venues.indexOf(ev.venue_id) > -1)) {
                        return false;
                    }
                }
                if (criteria.dates.hasOwnProperty("daysOfTheWeek")) {
                    if (!(criteria.dates.daysOfTheWeek.indexOf((new Date(ev.date)).getDay()) > -1)) {
                        return false;
                    }
                }
                if (criteria.dates.hasOwnProperty("from")) {
                    if (!(utils_1.dateSetOffset(new Date(criteria.dates.from), -32).getTime() <= utils_1.dateSetOffset(new Date(ev.date), -8).getTime())) {
                        return false;
                    }
                }
                if (criteria.dates.hasOwnProperty("to")) {
                    if (!(utils_1.dateSetOffset(new Date(criteria.dates.to), -32).getTime() >= utils_1.dateSetOffset(new Date(ev.date), -8).getTime())) {
                        return false;
                    }
                }
                return true;
            });
            if (!fromCache) {
                // POST PROCESS
                copy = copy.map(function (ev) {
                    ev.date = utils_1.dateSetOffset(new Date(ev.date), 0);
                    if (ev.flyer_url.indexOf("default") > -1) {
                        if (_this.config.data.hasOwnProperty("defaultFlyerURL")) {
                            ev.flyer_url = _this.config.data.defaultFlyerURL;
                        }
                    }
                    //CREATE DEEP MERGE
                    if (_this.config.data.hasOwnProperty("extend_data")) {
                        if (_this.config.data.extend_data.hasOwnProperty(ev.id)) {
                            ev = utils_1.merge(ev, _this.config.data.extend_data[ev.id], { usedeep: true, usenull: false, newobj: true });
                        }
                    }
                    return ev;
                });
            }
            post_process_data_1.postProcessData(copy, fromCache).then(function (copy) {
                // APPLY ORDER
                criteria.orderBy.forEach(function (order) {
                    switch (order.field) {
                        case "date":
                            copy.sort(function (a, b) {
                                var adate = (new Date(a.date)).getTime();
                                var bdate = (new Date(b.date)).getTime();
                                if (order.desc) {
                                    return bdate - adate;
                                }
                                else {
                                    return adate - bdate;
                                }
                            });
                            break;
                    }
                });
                _this.index.events = copy;
                _this.state("loading events", false);
                resolve(_this.index);
            });
        });
    };
    PdService.prototype.filterByID = function (filter, list, callback) {
        if (filter.length > 0) {
            callback(list.filter(function (item) { return filter.indexOf(item.id) > -1; }));
        }
        else {
            callback(list);
        }
    };
    /*
    # ====================================
    # - ARTISTS
    # Shorthand for get("artists")
    # ====================================
    */
    PdService.prototype.artists = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = { artists: [] }; }
        this.state("loading artists", true);
        return new Promise(function (resolve, reject) {
            if (_this.index.artists.length > 0) {
                _this.state("loading venues", false);
                _this.filterByID(filter, _this.index.artists, resolve);
            }
            else {
                _this.get("artists", function (list) { return _this.filterByID(filter, list, function (list) {
                    _this.state("loading artists", false);
                    resolve(list);
                }); });
            }
        });
    };
    /*
    # ====================================
    # - VENUES
    # Shorthand for get("venues")
    # ====================================
    */
    PdService.prototype.venues = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = { artists: [] }; }
        this.state("loading venues", true);
        return new Promise(function (resolve, reject) {
            if (_this.index.venues.length > 0) {
                _this.state("loading venues", false);
                _this.filterByID(filter, _this.index.venues, resolve);
            }
            else {
                _this.get("venues", function (list) { return _this.filterByID(filter, list, function (list) {
                    _this.state("loading venues", false);
                    resolve(list);
                }); });
            }
        });
    };
    /*
    # ====================================
    # - EVENTS
    # ====================================
    */
    PdService.prototype.events = function (opts) {
        var _this = this;
        if (opts === void 0) { opts = { loadAll: false, forceLoad: false }; }
        this.state("loading events", true);
        return new Promise(function (resolve, reject) {
            for (var key in _this.dataConfig) {
                if (!(opts.hasOwnProperty(key))) {
                    opts[key] = _this.dataConfig[key];
                }
            }
            if (opts.loadAll === true) {
                //console.log("Loading all");
                _this.get("events", function () { return resolve(_this.queryEvents(opts)); });
            }
            else if (Object.keys(_this.index.event).length < 1 || opts.forceLoad == true) {
                if (_this.config.prebaked === true) {
                    //console.log("Load prebaked");
                    _this._loadJSONP('events', -1, "/" + window.location.hostname + "/events.json", function (data) { return resolve(_this.queryEvents(opts)); });
                }
                else if (opts.events.length > 0) {
                    //console.log("Load events by id");
                    utils_1.asyncLoop(opts.events, true, function (event_id, isLast, next) { return _this.event(event_id).then(next); }, function () { return resolve(_this.queryEvents(opts)); });
                }
                else if (opts.artists.length > 0) {
                    //console.log("Load events by artist");
                    utils_1.asyncLoop(opts.artists, true, function (artist_id, isLast, next) { return _this._loadJSONP('events', -1, "/artist/" + artist_id + "/events.json", next); }, function () { return resolve(_this.queryEvents(opts)); });
                }
                else {
                    if (opts.venues.length < 1) {
                        //console.log("Load events for all venues");
                        _this.get("events", function () { return resolve(_this.queryEvents(opts)); });
                    }
                    else {
                        //console.log("Load events by venue");
                        utils_1.asyncLoop(opts.venues, true, function (venue_id, isLast, next) { return _this._loadJSONP('events', -1, "/venue/" + venue_id + "/events.json", next); }, function () { return resolve(_this.queryEvents(opts)); });
                    }
                }
            }
            else {
                //console.log("Nothing to load just return what's been loaded");
                resolve(_this.queryEvents(opts, true));
            }
        });
    };
    PdService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [window_ref_1.WindowRef, config_service_1.Config])
    ], PdService);
    return PdService;
}());
exports.PdService = PdService;
//# sourceMappingURL=pd.service.js.map