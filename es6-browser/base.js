/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
module.exports = {
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "plugins": [
    ],
    "env": {
        "browser": true
    },
    "rules": {
        "comma-dangle": "off",
        "no-underscore-dangle": "off",
        "func-names": "off",
        "import/no-unresolved" : "off",
        "indent" : "off",
        "linebreak-style": "off",
        "no-console" : "off",
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true }],
        "no-use-before-define" : ["error", {"functions" : false, "classes" : true}],
        "strict" : "off",
        "vars-on-top": "off",
        "max-len": ['error', 100, 2, {
          ignoreUrls: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
    }
};
