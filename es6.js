/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
// Config for es6
module.exports = {
  extends: [
    './es6/base'
  ].map(require.resolve),
  rules: {}
};
