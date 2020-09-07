'use strict';

define([
    'vbdt/components-model/resources/HTMLModelledResource',
    'vbdt/platform/api/translations/app/api/TranslationsManager',
    'vbdt/platform/api/translations/app/api/bundleModel/KeyGenerator',
    'vbdt/platform/api/utils/StringUtils',
], (
    HTMLModelledResource,
    TranslationsManager,
    KeyGenerator,
    StringUtils
) => {

    class FixH6toH3 {

        xshouldFixH6(issue, context) {
            return true;
        }

        async fixH6(issue, context) {
            // canTranslateProperty has ensured state.
            const path = issue.filePath || context.resourcePath;
            const rm = context.application.getState().getResourceManager();
            return rm.doTransaction(async () => {
                const resource = await rm.getResource(path);
                const content = await resource.getContent();
                const newContent = content.replace('h6', 'h3');
                await resource.setContent(newContent);
            }, 'Change H6 to H3');
        }
    }

    return FixH6toH3;
});

