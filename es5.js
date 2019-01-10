/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
// Config for es6
module.exports = {
  extends: [
    './es5/base'
  ].map(require.resolve),
  rules: {}
};
