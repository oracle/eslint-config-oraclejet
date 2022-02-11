/**
  Copyright (c) 2015, 2022, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
// Config for es6-browser
module.exports = {
  extends: [
    './es6-browser/base'
  ].map(require.resolve),
  rules: {}
};
