'use strict';

define([
    'estraverse',
    'vbdt/artifact-platform/api/VersionUtils',
    'vbdt/platform/api/audit/AbstractAuditor',
], (
    estraverse,
    VersionUtils,
    AbstractAuditor
) => {
    class TestAuditorsOnWorkerJs extends AbstractAuditor {
        constructor(auditableObject, application, id, workerContext) {
            super(auditableObject, application, id, workerContext);
        }

        dependOnAllLoadedResources() {
            return false;
        }

        async getIssues(/* progress */) {
            // Works fine. FA can use this if they want
            const clientApplications = await this.getApplication().getState().getClientApplications();
            const clientApp = clientApplications.getClientApplication(this.getAuditedResourcePath());
            const resolver = await clientApp.getState().getRtPlatformMetadata();
            // Get JET AND RT version info
            const jetVersionInfo = await resolver.getJetVersionInfo();

            const jsmodel = await this.getAuditedResourceModel();
            const prototypeFunctions = await jsmodel.getPrototypeFunctions();
            const {global, ast, textContents, moduleObj} = await jsmodel._getModuleJsObject(false);

            // Do anything now with global/ast/moduleObj. Example:
            const issues = [];
            if (moduleObj && moduleObj._name && !moduleObj._name.endsWith('Module')) {
		const artifact = this.getAuditedResourcePath();
                const issue = {
                    ruleId: 'some-fa-js-rule',
                    severity: 'warning',
                    message: 'I am an issue reported by FA. Variable convention of returned class should end with \'Module\'',
                    location: {
                        line: moduleObj._textRange.getStartTextPosition().getLine() + 1,
                        col: moduleObj._textRange.getStartTextPosition().getColumn() + 1,
                        length: moduleObj._name.length,
                    },
                };
                issues.push(issue);
            }

            return issues;
        }
    }

    return TestAuditorsOnWorkerJs;
});
