'use strict';

define([
    'otool/framework/languages/javascript/JavaScriptObjectPropertyUtils',
    'vbdt/artifact-editor/audit/auditors-html/HtmlAuditUtils',
    'vbdt/artifact-platform/api/ArtifactModelUtils',
    'vbdt/components-model/api/ComponentsView',
    'vbdt/platform/api/audit/AbstractAuditor',
], (
    JavaScriptObjectPropertyUtils,
    HtmlAuditUtils,
    ArtifactModelUtils,
    ComponentsView,
    AbstractAuditor
) => {

    class TestAuditorsOnWorkerHtml extends AbstractAuditor {
        constructor(auditableObject, application, id, workerContext) {
            super(auditableObject, application, id, workerContext);
        }

        dependOnAllLoadedResources() {
            return false;
        }

        async getIssues(/* progress */) {
            const componentsModel = await this.getAuditedResourceModel();

            // Example for looking across files
            let shouldCheckRootId = false;
            const appJsModel = await ArtifactModelUtils.getAppJsModel(this.getApplication(), this.getAuditedResourcePath());
            const {ast: appJsAst, global: appJsGlobal} = await appJsModel._getModuleJsObject(false);
            JavaScriptObjectPropertyUtils.executeForEachProperty(appJsGlobal, (prop, isInstanceProp) => {
                if (isInstanceProp && prop._name === 'ID_CHECK_DEFINED') {
                    shouldCheckRootId = true;
                }
            });

            const matchedComponents = componentsModel.getAllComponents(ComponentsView.ALL);
            const issues = [];
            if (matchedComponents && matchedComponents.length > 0 && matchedComponents[0].domNode.attributes && !matchedComponents[0].domNode.attributes.id && shouldCheckRootId) {
                const loc = {
                    type: 'domPath',
                    subtype: 'startTag',
                    path: matchedComponents[0].getPath(),
                };

                const issue = {
                    ruleId: 'some-fa-html-rule',
                    severity: 'warning',
                    message: 'I am an issue reported by FA. Top level element should have ID',
                    location: loc,
                };
                issues.push(issue);
            }

            return issues;
        }
    }

    return TestAuditorsOnWorkerHtml;
});
