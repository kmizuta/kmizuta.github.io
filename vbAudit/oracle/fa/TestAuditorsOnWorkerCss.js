'use strict';

define([
    'otool/framework/languages/css/parser/css-parse/CSSParse',
    'vbdt/platform/api/audit/AbstractAuditor',
], (
    CSSParse,
    AbstractAuditor
) => {

    class TestAuditorsOnWorkerCss extends AbstractAuditor {
        constructor(auditableObject, application, id, workerContext) {
            super(auditableObject, application, id, workerContext);
        }

        dependOnAllLoadedResources() {
            return false;
        }

        async getIssues(/* progress */) {
            const workerContext = this.getWorkerContext();
            // TODO Have a CSSModel.js
            //const cssmodel = await this.getAuditedResourceModel();
            const options = {
                position: true,
            };

            const cssString = await this.getAuditedResourceContent();
            const ast = new CSSParse(cssString, options).parse();

            const issues = [];
            if (ast && ast.stylesheet && ast.stylesheet.rules) {
                ast.stylesheet.rules.forEach((rule) => {
                    if (rule.selectors) {
                        rule.selectors.forEach((sel) => {
                            if (sel === 'h6') {
                                const issue = {
                                    ruleId: 'some-fa-css-rule',
                                    location: {
                                        line: rule.position.start.line,
                                        col: rule.position.start.column,
                                        length: sel.length,
                                    },
                                };
                                issues.push(issue);
                            }
                        });
                    }
                });
            }

            return issues;
        }
    }

    return TestAuditorsOnWorkerCss;
});
