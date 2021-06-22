const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "brand-primary" : "#db2b39",
                            "brand-primary-tap" : "#db2b39",
                            "primary-color": "#db2b39",
                            "link-color": "#0DD078",
                            "success-color": "#0DD078",
                            "border-radius-base": "7px",
                            "tabs-color": "#db2b39"
                            // "tabs-height": 43.5 * @hd;
                            // "tabs-font-size-heading": 15 * @hd;
                            // "tabs-ink-bar-height": @border-width-lg;
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
