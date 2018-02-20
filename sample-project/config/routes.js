"use strict";
var express = require('express');
var MD = require('@molecule-driver/core');
var router = express.Router();
var logged = false;
router.route('/molecule')
    .get(function (req, res) {
    MD.server.get(req.body)
        .then(function (response) { return res.json(response); })
        .catch(function (response) { return res.json(response); });
})
    .put(function (req, res) {
    MD.server.post(req.body)
        .then(function (response) { return res.json(response); })
        .catch(function (response) { return res.json(response); });
})
    .post(function (req, res) {
    MD.server.post(req.body)
        .then(function (response) { return res.json(response); })
        .catch(function (response) { return res.json(response); });
})
    .delete(function (req, res) {
    MD.server.delete(req.body)
        .then(function (response) { return res.json(response); })
        .catch(function (response) { return res.json(response); });
});
router.get('/logout', function (req, res) {
    logged = false;
    res.redirect('/');
});
router.get('/login', function (req, res) {
    logged = true;
    res.redirect('/');
});
router.get("*", function (req, res) {
    if (logged) {
        MD.client.app(req, res);
    }
    else {
        res.render('login');
    }
});
module.exports = router;
//# sourceMappingURL=routes.js.map