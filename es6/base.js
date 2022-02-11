/**
  Copyright (c) 2015, 2022, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
module.exports = {
    "extends": "airbnb-base",
    "plugins": [
    ],
    "rules": {
        "comma-dangle": "off",
        "no-underscore-dangle": "off",
        "func-names": "off",
        "function-paren-newline": "off",
        "import/no-unresolved" : "off",
        "indent" :  "off",
        "linebreak-style": "off",
        "no-console" : "off",
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true }],
        "no-restricted-globals": "off",
        "no-use-before-define" : ["error", {"functions" : false, "classes" : true}],
        "object-curly-newline": "off",
        "prefer-destructuring": "off",
        "prefer-promise-reject-errors": "off",
        'spaced-comment': ['error', 'always', {
            line: {
              exceptions: ['-', '+'],
              markers: ['=', '!'], // space here to support sprockets directives
            },
            block: {
              exceptions: ['-', '+'],
              markers: ['=', '!'], // space here to support sprockets directives
              balanced: false,
            }
          }],
        "strict" : "off",
    }
};
