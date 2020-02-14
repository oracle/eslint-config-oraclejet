/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
module.exports = {
    "installedESLint": true,
    "extends": "airbnb-base",
    "plugins": [
    ],
    "rules": {
        "comma-dangle": "off",
        "no-underscore-dangle": "off",
        "func-names": "off",
        "import/no-unresolved" : "off",
        "linebreak-style": "off",
        "no-console" : "off",
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true }],
        "no-use-before-define" : ["error", {"functions" : false, "classes" : true}],
        "strict" : "off",
    }
};
