/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
module.exports = {
    "parserOptions": {
        "ecmaVersion": 5
    },
    "extends": "airbnb/legacy", // use for ESLint5
    "plugins": [
        "react",
    ],
    "env": {
        "jquery": true
    },
    "globals": {
        "oj": true
    },
    "rules": {
        "comma-dangle": "off",
        "dot-notation": "off",
        "func-names": "off",
        "linebreak-style": "off",
        "no-use-before-define" : ["error", {"functions" : false, "classes" : true}],
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true }],
        "no-underscore-dangle": "off", 
        "quote-props": "off", 
    }
}
