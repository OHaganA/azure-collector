/* -----------------------------------------------------------------------------
 * @copyright (C) 2017, Alert Logic, Inc
 * @doc
 * 
 * The module for communicating with O365 management APIs.
 * 
 * @end
 * -----------------------------------------------------------------------------
 */

const util = require('util');

const m_o365mgmnt = require('./o365management');

const {ApplicationTokenCredentials} = require('@azure/ms-rest-nodeauth');

var g_appAdCreds = new ApplicationTokenCredentials(
    process.env.CUSTOMCONNSTR_APP_CLIENT_ID,
    process.env.APP_TENANT_ID,
    process.env.CUSTOMCONNSTR_APP_CLIENT_SECRET,
    'https://manage.office.com'
);

var g_o365mgmnt = new m_o365mgmnt.O365Management(g_appAdCreds, process.env.APP_TENANT_ID);

/**
 * @summary Office 365 Management API subscription/list.
 *
 * Office 365 Management API subscription/list.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#list-current-subscriptions Reference.}
 *
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _subscriptionsList = function(callback) {
    g_o365mgmnt.subscriptionsList(null, 
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = `O365 subscriptions/list ${error}`;
            return callback(retError, result, httpRequest, response);
    });
    
};

/**
 * @summary Office 365 Management API subscription/start.
 *
 * Office 365 Management API subscription/start.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#start-a-subscription Reference.}
 *
 * @param {string} contentType - Offices 365 management API activity content types: 
 * Audit.AzureActiveDirectory, Audit.Exchange, Audit.SharePoint, Audit.General, DLP.All
 * @param {object} [webhook] - webhook to receive notifications from Office 365 management API.
 * @param {string} [webhook.address] - webhook URI.
 * @param {string} [webhook.authId] - optional webhook authentication string.
 * @param {string} [webhook.expiration] - webhook expiration timestamp. Empty for non-expire.
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _subscriptionsStart = function(contentType, webhook, callback) {
    g_o365mgmnt.subscriptionsStart(contentType, webhook, null, 
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = util.format(
                    'O365 subscriptions/start error. ContentType = %s, webhook = %j, error = %j',
                    contentType, webhook, error);
            return callback(retError, result, httpRequest, response);
    });
};

/**
 * @summary Office 365 Management API subscription/stop.
 *
 * Office 365 Management API subscription/stop.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#stop-a-subscription Reference.}
 *
 * @param {string} contentType - Offices 365 management API activity content types: 
 * Audit.AzureActiveDirectory, Audit.Exchange, Audit.SharePoint, Audit.General, DLP.All
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _subscriptionsStop = function(contentType, callback) {
    g_o365mgmnt.subscriptionsStop(contentType, null, 
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = util.format(
                    'O365 subscriptions/stop error. ContentType = %s, error = %j',
                    contentType, error);
            return callback(retError, result, httpRequest, response);
    });
};

/**
 * @summary Office 365 Management API subscription/content.
 *
 * Office 365 Management API subscription/content.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#list-available-content Reference.}
 * 
 * @param {string} contentType - Offices 365 management API activity content types: 
 * Audit.AzureActiveDirectory, Audit.Exchange, Audit.SharePoint, Audit.General, DLP.All
 * @param {timestamp} startTs - Optional datetimes (UTC) indicating the time range of content to return.
 * @param {timestamp} endTs - Optional datetimes (UTC) indicating the time range of content to return.
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _subscriptionsContent = function(contentType, startTs, endTs, callback) {
    g_o365mgmnt.subscriptionsContent(contentType, startTs, endTs, null,
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = util.format(
                    'O365 subscriptions/content error. ContentType = %s, startTs = %j, endTs = %j, error = %j',
                    contentType, startTs, endTs, error);
            return callback(retError, result, httpRequest, response);
    });
};

/**
 * @summary Office 365 Management API subscription/notifications.
 *
 * Office 365 Management API subscription/notifications.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#list-notifications Reference.}
 * 
 * @param {string} contentType - Offices 365 management API activity content types: 
 * Audit.AzureActiveDirectory, Audit.Exchange, Audit.SharePoint, Audit.General, DLP.All
 * @param {timestamp} startTs - Optional datetimes (UTC) indicating the time range of content to return.
 * @param {timestamp} endTs - Optional datetimes (UTC) indicating the time range of content to return.
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _subscriptionsNotifications = function(contentType, startTs, endTs, callback) {
    g_o365mgmnt.subscriptionsNotifications(contentType, startTs, endTs, null,
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = util.format(
                    'O365 subscriptions/notifications error. ContentType = %s, startTs = %j, endTs = %j, error = %j',
                    contentType, startTs, endTs, error);
            return callback(retError, result, httpRequest, response);
    });
};

/**
 * @summary Office 365 Management API fetch content.
 *
 * Office 365 Management API fetch content.
 * {@link https://msdn.microsoft.com/office-365/office-365-management-activity-api-reference#retrieving-content Reference.}
 *
 * @param {string} contentUri - content URI specified in notification or subscriptions/content API call results.
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *      {Error}  err        - The Error object if an error occurred, null otherwise.
 *      {null} [result]     - The deserialized result object if an error did not occur.
 *      {object} [request]  - The HTTP Request object if an error did not occur.
 *      {stream} [response] - The HTTP Response stream if an error did not occur.
 *
 */
var _getContent = function(contentUri, callback) {
    g_o365mgmnt.getContent(contentUri, null,
        function(error, result, httpRequest, response) {
            let retError = error;
            if (error) 
                retError = util.format(
                    'O365 fetch content error. uri = %s, error = %j',
                    contentUri, error);
            return callback(retError, result, httpRequest, response);
    });
};


module.exports = {
    subscriptionsList : _subscriptionsList,
    subscriptionsStart : _subscriptionsStart,
    subscriptionsStop : _subscriptionsStop,
    subscriptionsContent : _subscriptionsContent,
    subscriptionsNotifications : _subscriptionsNotifications,
    getContent : _getContent
};
