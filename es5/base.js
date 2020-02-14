/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
module.exports = {
    "parserOptions": {
        "ecmaVersion": 5
    },
    "extends": "airbnb-base/legacy", // use for ESLint5
    "plugins": [
    ],
    "env": {
        "jquery": true
    },
    "globals": {
        "oj": true
    },
    "rules": {
        "comma-dangle": "off",
        "func-names": "off",
        "linebreak-style": "off",
        "no-use-before-define" : ["error", {"functions" : false, "classes" : true}],
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true }],
        "no-underscore-dangle": "off", 
        "vars-on-top": "off",
        "max-len": ['error', 100, 2, {
          ignoreUrls: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],        
    }
}
