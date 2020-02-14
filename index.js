/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
// Default config
module.exports = {
  extends: [
    './es5/base'
  ].map(require.resolve),
  rules: {}
};
