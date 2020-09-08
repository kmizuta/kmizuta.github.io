/* global module */
/* eslint-env node */

'use strict';

define([], function() {

//    return { auditors: [{
//        modulePath: 'oracle/fa/FAAuditor',
//        id: 'faTestHtmlPageAuditor',
//        resourceMatch: '(.)*-page\\.html$',
//        onWorker: false
//    },
//    {
//        modulePath: 'oracle/fa/FAAuditorWorker',
//        id: 'faTestHtmlPageAuditorWorker',
//        resourceMatch: '(.)*-page\\.js$'
//    }] };

    return { auditors: [
	{
		modulePath: 'oracle/fa/TestAuditorsOnWorkerJs',
		resourceMatch: '(.)*-(page|flow)\\.js$',
	},
	{
		modulePath: 'oracle/fa/TestAuditorsOnWorkerHtml',
		resourceMatch: '(.)*-(page|flow)\\.html$',
	},
	{
		modulePath: 'oracle/fa/TestAuditorsOnWorkerCss',
		resourceMatch: '(.)*.css$',
	},
	{
		modulePath: 'oracle/fa/TestAuditorsOnWorkerJson',
		resourceMatch: '(.)*-(page|flow)\\.json$',
	}],

        auditMetadata: [
                {
                    metadataPath: 'text!oracle/fa/auditconfig/farules.json',
                }
        ]
    };
});
