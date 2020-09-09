"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../providers/Environment");
const Log_1 = require("./Log");
const jwt = require('jsonwebtoken');
const generateAccessToken = (user) => {
    return jwt.sign(user, Environment_1.default.get().tokenSecret, { expiresIn: `30 days` });
};
const Clean = {
    settings: function (res, user) {
        Log_1.default.info(`[From Clean Settings] Value of user => ${user}`);
        return res.status(200).send({ user: this.buildSettings(user) });
    },
    deny: function (res, status = 403, msg = '') {
        let _user = this.killUser();
        Log_1.default.info(`[From Clean Deny] Sending a ${status}, with message => ${msg}`);
        return res.status(status).send({ msg, user: _user });
    },
    approve: function (res, status, user, msg = '') {
        let _user = this.buildUser(user);
        Log_1.default.info(`[From Clean Approve] Sending a ${status}, with user => ${JSON.stringify(_user)} and message => ${msg}`);
        return res.status(status).send({ msg, user: _user });
    },
    success: function (res, status, content = {}, msg = '') {
        Log_1.default.info(`[From Clean Success] Sending a ${status}, with content => ${JSON.stringify(content)} and message => ${msg}`);
        return res.status(status).send({ msg, content });
    },
    failure: function (res, status, content = {}, msg = '') {
        Log_1.default.info(`[From Clean Failure] Sending a ${status}, with content => ${JSON.stringify(content)} and message => ${msg}`);
        return res.status(status).send({ msg, content });
    },
    killUser: function () {
        return {
            email: null,
            id: null,
            authed: false,
            role: null,
            token: null
        };
    },
    buildUser: function (user) {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            role: user.role,
            token: generateAccessToken({
                userid: user._id,
                email: user.email,
                role: user.role
            })
        };
    },
    buildSettings: function (user) {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            role: user.role,
            token: generateAccessToken({
                userid: user._id,
                email: user.email,
                role: user.role
            }),
            allowsemails: user.allowEmails,
            isemailverified: user.emailVerified
        };
    },
    apiError: function (funcname, e, res) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)}`, [Log_1.default.TAG_API_ERROR]);
        return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
    },
    authError: function (funcname, e, res) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)} :: User Auth Failure`, [Log_1.default.TAG_AUTH]);
        return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser() });
    }
};
exports.default = Clean;
//# sourceMappingURL=Clean.js.map