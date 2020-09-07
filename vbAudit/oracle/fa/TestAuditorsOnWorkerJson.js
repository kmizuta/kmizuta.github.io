'use strict';

define([
    'vbdt/platform/api/audit/AbstractAuditor',
    'vbdt/platform/api/resource/location/JSONPointerRefs',
], (
    AbstractAuditor,
    JSONPointerRefs
) => {

    class TestAuditorsOnWorkerJson extends AbstractAuditor {
        constructor(auditableObject, application, id, workerContext) {
            super(auditableObject, application, id, workerContext);
        }

        dependOnAllLoadedResources() {
            return false;
        }

        async getIssues(/* progress */) {
            const jsonmodel = await this.getAuditedResourceModel();
            const issues = [];
            if (jsonmodel && jsonmodel.title === '') {
                const issue = {
                    ruleId: 'some-fa-json-rule',
                    severity: 'warning',
                    message: 'I am an issue reported by FA. Title cannot be blank',
                    location: {
                        path: '/title', // NOTRANS
                        type: JSONPointerRefs.TYPE,
                    },
                };
                issues.push(issue);
            }

            return issues;
        }
    }

    return TestAuditorsOnWorkerJson;
});
