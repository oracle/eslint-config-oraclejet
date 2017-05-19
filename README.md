# eslint-config-oraclejet 3.1.0

This package contains the ESLint configurations used by the Oracle JET project.  These configurations come in two flavors:

* es5: this configuration is used by the JET runtime code base, which is authored in ES5.
* es6: this configuration is used by the JET tooling code base, which consists of a collection of Node-based packages that are authored in ES6.

These ESLint configurations are based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), which defines thorough JavaScript coding guidelines with the goal of ensuring a clean, consistent code base.  The Oracle JET configurations introduce some deltas on top of the base ESLint configurations defined by Airbnb, as explained below.

Application developers are welcome to use the Oracle JET ESLint configurations with their own code bases, though be aware that several of the changes are fairly specific to JET (eg. use of underscore prefixes), so please review the changes below before adoption.  A better option for JET-based applications that want to follow a similar coding standard without picking up the JET-specific quirks would be to use [Airbnb's ESLint configurations](https://www.npmjs.com/package/eslint-config-airbnb) directly.

## Deltas to the Airbnb ESLint Configurations

The following sections list the modifications that the Oracle JET ESLint configurations apply on top of the base Airbnb configurations.

### 1. Common Deltas

The items in this section apply to both our ES5 and ES6 configurations.

#### 1.1 Underscore prefixes are used for private variables

_ESLint rule change_: [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle) is disabled.

While the use of underscore prefixes to identify "private" properties (functions and variables) is a [controversial](https://github.com/airbnb/javascript/issues/1024) [topic](https://github.com/airbnb/javascript/issues/1089), the JET code base uses this convention.  We understand that naming conventions are not a robust solution for enforcing privacy. To help mitigate some of the risk, the JET runtime code base is run through the [Closure Compiler](https://developers.google.com/closure/compiler/), which mangles private property names.

The JET team is evaluating other [approaches to private properties](https://curiosity-driven.org/private-properties-in-javascript), and would encourage our clients to do the same.

#### 1.2 Anonymous function expressions are allowed

_ESLint rule change_: [func-names](http://eslint.org/docs/rules/func-names) is disabled.

The Airbnb ESLint rules enforce that all function expressions must be named.  This requires duplication when assigning function expressions, eg:

```javascript
  Foo.prototype.doSomething = function doSomething() { };
```

Given that ES6 specifies new rules for [function name inference](http://www.ecma-international.org/ecma-262/6.0/#sec-assignment-operators-runtime-semantics-evaluation), the JET code base allows anonymous function expressions.

Note that while modern browsers support function name inference, the use of anonymous function expressions can make debugging more challenging on older browsers (eg. IE11).

#### 1.3 Functions may be called before they are defined.

_ESLint rule change_: [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define) is disabled for functions.

Robert Martin's [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) promotes the notion that code should read like a top-down  narrative, where higher level functions appear at the top of the module, followed by functions of increasingly lower levels of abstraction that are used to implement the preceding higher level functions.  This approach to code organization is dubbed "The Stepdown Rule".

The JET team likes this rule enough to justify disabling the no-use-before-define rule defined by Airbnb's ESLint config.  (We disable the rule just for functions, not for variables).

#### 1.4. Function declarations are allowed.

_ESLint rule change_: None.

The Airbnb style guide prefers the use of [function expressions instead of function declarations](https://github.com/airbnb/javascript#functions--declarations) due to concerns over confusion relating to function [hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html).

We have found function declarations to be reasonably readable and have not had problems with function declaration hoisting confusion.  As such, we continue to use this language feature.

Note that it appears that Airbnb eventually plans to enforce the use of function expressions via the [func-style](http://eslint.org/docs/rules/func-style) rule.  However, this is not yet enforced, so JET does not yet make any rule changes relating to this.

#### 1.5 Platform-specific line breaks are allowed

_ESLint rule change_: [linebreak-style](http://eslint.org/docs/rules/linebreak-style) is disabled.

Rather than enforce a consistent line break style via ESLint, we prefer to deal with this at the source control layer.  This allows our developers to do development on their platform of choice (including running ESLint).

#### 1.6 The unary increment/decrement operators may be used in for loops.

_ESLint rule change_: [no-plusplus](http://eslint.org/docs/rules/no-plusplus) is disabled for afterthoughts in for loops.

The Airbnb style guide raises various [concerns about the use of ++ and --](https://github.com/airbnb/javascript#variables--unary-increment-decrement).  While we agree with these concerns, we are comfortable with allowing these operators in for loops.

Note that, like Airbnb, we prefer [higher-order functions instead of loops](https://github.com/airbnb/javascript#iterators--nope).  But for the few places where we do loop, we are okay with seeing increment/decrement operators.

### 2. ES6-specific Deltas

The following changes are specific to the ES6 version of the Oracle JET ESLint configuration, used by JET's Node-based tooling packages.

#### 2.1 Console logging is allowed

_ESLint rule change_: [no-console](http://eslint.org/docs/rules/no-console) is disabled.

For the moment, our ES6 configuration is exclusively used by JET's  Node-based tooling modules.  These modules use console logging to communicate with the end user.

Note we are considering generalizing our ES6 rules to apply to browser code as well, in which case we would change to (globally) disallowing console logging.

#### 2.2 Use strict is allowed

_ESLint rule change_: [strict](http://eslint.org/docs/rules/strict) is disabled.

The Airbnb ESLint config forbids the use of 'use strict' as Airbnb relies on [Babel](https://babeljs.io/) to automatically insert this construct as needed.  Since JET's build infrastructure does not automatically insert 'use strict', our ESLint config allows developers to do this manually.

#### 2.3 Dangling commas are not required

_ESLint rule change_: [comma-dangle](http://eslint.org/docs/rules/comma-dangle) is disabled.

Airbnb's (ES6) style guide mandates the use of dangling commas for the purpose of having cleaner git diffs.  We find that dangling commas can be slightly less readable/more confusing for developers, so we prefer to optimize for reading over diff'ing.

#### 2.4 Unresolved imports are (temporarily) allowed

_ESLint rule change_: [import/no-unresolved](http://eslint.org/docs/rules/import/no-unresolved) is disabled.

While we would like to leave this rule enabled, we are currently seeing some seemingly false positives trigger by this rule.  We are temporarily disabling this while we get to the bottom of the violations.

### 3. ES5-specific Deltas

The following changes are specific to the ES5 version of the Oracle JET ESLint configuration, used by the JET runtime (browser-based) code base.  Note that our ES5 config is based on the [ES5 version of the Airbnb style guide](https://github.com/airbnb/javascript/tree/es5-deprecated/es5)

#### 3.1 Quoted properties are allowed

_ESLint rule change_: [quote-props](http://eslint.org/docs/rules/import/quote-props) and [dot-notation](http://eslint.org/docs/rules/dot-notation) are disabled.

Like Airbnb, we strongly prefer dot notation over quoting.  However, the JET code base uses quoting as a way to ensure that the Closure Compiler does not mangle certain property names.  Rather than suppress each of these violations locally each time the quoted property is referenced, we decided to disable these two ESLint rules.

We would recommend that teams building JET-based applications use dot notation and leave these two rules enabled.

## [Contributing](https://github.com/oracle/eslint-config-oraclejet/tree/master/CONTRIBUTING.md)
Oracle JET is an open source project.  Pull Requests are currently not being accepted. See [CONTRIBUTING](https://github.com/oracle/eslint-config-oraclejet/tree/master/CONTRIBUTING.md) for details.

## [License](https://github.com/oracle/eslint-config-oraclejet/tree/master/LICENSE.md)
Copyright (c) 2014, 2017 Oracle and/or its affiliates The Universal Permissive License (UPL), Version 1.0
