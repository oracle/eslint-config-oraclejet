# @oracle/eslint-config-oraclejet 13.1.0

This package contains the ESLint configurations used by the Oracle JET project.  These configurations come in two flavors:

* es5: this configuration is used by the JET runtime code base, which is authored in ES5.
* es6: this configuration is used by the JET tooling code base, which consists of a collection of Node-based packages that are authored in ES6.

These ESLint configurations are based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), which defines thorough JavaScript coding guidelines with the goal of ensuring a clean, consistent code base.  The Oracle JET configurations introduce some deltas on top of the base ESLint configurations provided by Airbnb, as explained below.

Application developers are welcome to use the Oracle JET ESLint configurations with their own code bases, though be aware that several of the changes are fairly specific to JET (e.g. use of underscore prefixes), so please review the information below before adoption.  A better option for JET-based applications that want to follow a similar coding standard without picking up the JET-specific quirks would be to use [Airbnb's ESLint configurations](https://www.npmjs.com/package/eslint-config-airbnb) directly.

## Deltas to the Airbnb ESLint Configurations

The following sections list the modifications that the Oracle JET ESLint configurations apply on top of the base Airbnb configurations.

### 1. Common Deltas

The items in this section apply to both of our configurations (ES5 and ES6).

#### 1.1 Underscore prefixes are used for private variables

_ESLint rule change_: [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle) is disabled.

While the use of underscore prefixes to identify "private" properties (functions and variables) is a [controversial](https://github.com/airbnb/javascript/issues/1024) [topic](https://github.com/airbnb/javascript/issues/1089), the JET code base uses this convention.  We understand that naming conventions are not a robust solution for enforcing privacy. To help mitigate some of the risk, the JET runtime code base is run through the [Closure Compiler](https://developers.google.com/closure/compiler/), which mangles private property names.

The JET team is evaluating other [approaches to private properties](https://curiosity-driven.org/private-properties-in-javascript), and would encourage our clients to do the same.

#### 1.2 Anonymous function expressions are allowed

_ESLint rule change_: [func-names](http://eslint.org/docs/rules/func-names) is disabled.

The Airbnb ESLint rules enforce that all function expressions must be named.  This requires duplication when assigning function expressions, e.g.:

```javascript
  Foo.prototype.doSomething = function doSomething() { };
```

Given that ES6 specifies new rules for [function name inference](http://www.ecma-international.org/ecma-262/6.0/#sec-assignment-operators-runtime-semantics-evaluation), the JET code base allows anonymous function expressions.

Note that while modern browsers support function name inference, the use of anonymous function expressions can make debugging more challenging on older browsers (e.g. IE11).

#### 1.3 Functions may be used before they are defined (in non-hoisting situations)

_ESLint rule change_: [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define) is disabled for functions.

Robert Martin's [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) promotes the notion that code should read like a top-down  narrative, where higher level functions appear at the top of the module, followed by functions of increasingly lower levels of abstraction that are used to implement the preceding higher level functions.  This approach to code organization is dubbed "The Stepdown Rule".

Unfortunately, the no-use-before-define ESLint rule is not compatible with this approach.

In theory, no-use-before-define intends to protect developers from relying on function hoisting behavior like this:

```javascript
// Call function that has not yet been defined
doSomething();

// Define function somewhere later in the same scope
function doSomething() { }
```
The above code relies on the fact that the definition of the doSomething function will be hoisted to the top of the scope, above the doSomething() call.  This is reasonable to flag.

However, the no-use-before-define rule additionally reports the following code as a violation:

```javascript
function doSomething() {
  doSomeLowerLevelThing();
}

function doSomeLowerLevelThing() {}
```

Although the above code does not rely on function hoisting, no-use-before-define still considers this code to be invalid, which prohibits the use of Martin's Stepdown Rule.

The JET team likes the Stepdown Rule enough to justify disabling the no-use-before-define rule defined by Airbnb's ESLint config.  (We disable the rule just for functions, not for variables.)

If in the future we find (or implement) an ESLint rule that can distinguish between hoisting-dependent vs. hoisting-independent usages, we may start treating hoisting-dependent use-before-define cases as violations.  As such, we encourage JET developers to limit reliance on function hoisting, even though this is not currently enforced.


#### 1.4. Function declarations are allowed

_ESLint rule change_: None.

The Airbnb style guide prefers the use of [function expressions instead of function declarations](https://github.com/airbnb/javascript#functions--declarations) due to concerns over function [hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) confusion.

We have found function declarations to be readable and have increased complexity in our code base.  As such, we continue to leverage this language feature.

Note that it appears that Airbnb eventually plans to enforce the use of function expressions via the [func-style](http://eslint.org/docs/rules/func-style) rule.  However, this is not yet enforced, so JET does not yet make any rule changes relating to this.

#### 1.5 Platform-specific line breaks are allowed

_ESLint rule change_: [linebreak-style](http://eslint.org/docs/rules/linebreak-style) is disabled.

Rather than enforce a consistent line break style via ESLint, we prefer to deal with this at the source control layer.  This allows our developers to do development (including running ESLint) on their platform of choice without having to worry about line breaks.

#### 1.6 The unary increment/decrement operators may be used in for loops

_ESLint rule change_: [no-plusplus](http://eslint.org/docs/rules/no-plusplus) is disabled for afterthoughts in for loops.

The Airbnb style guide raises various [concerns about the use of ++ and --](https://github.com/airbnb/javascript#variables--unary-increment-decrement).  While we agree with these concerns, we are comfortable with allowing these operators in for loops.

Note that, like Airbnb, we prefer [higher-order functions instead of loops](https://github.com/airbnb/javascript#iterators--nope).

### 2. ES6-specific Deltas

The following changes are specific to the ES6 version of the Oracle JET ESLint configuration, used by JET's Node-based tooling packages.

#### 2.1 Console logging is allowed

_ESLint rule change_: [no-console](http://eslint.org/docs/rules/no-console) is disabled.

For the moment, our ES6 configuration is exclusively used by JET's Node-based tooling modules.  These modules use console logging to communicate with the end user.

Note we are considering generalizing our ES6 rules to apply to browser code as well, in which case we would change to (globally) disallowing console logging.

#### 2.2 Use strict is allowed

_ESLint rule change_: [strict](http://eslint.org/docs/rules/strict) is disabled.

The Airbnb ESLint config forbids the use of 'use strict' as Airbnb relies on [Babel](https://babeljs.io/) to automatically insert this construct as needed.  Since JET's build infrastructure does not automatically insert 'use strict', our ESLint config allows developers to do this manually.

#### 2.3 Dangling commas are not required

_ESLint rule change_: [comma-dangle](http://eslint.org/docs/rules/comma-dangle) is disabled.

Airbnb's (ES6) style guide mandates the use of dangling commas for the purpose of having cleaner git diffs.  We find that dangling commas can be slightly less readable and slightly more confusing for developers, so we prefer to optimize for reading over diff'ing.

#### 2.4 Unresolved imports are (temporarily) allowed

_ESLint rule change_: [import/no-unresolved](http://eslint.org/docs/rules/import/no-unresolved) is disabled.

While we would like to leave this rule enabled, we are currently seeing some false positives triggered by this rule.  As such, we are temporarily disabling this while we get to the bottom of the violations.  We plan to re-enable this rule in a future version of our eslint-config-oraclejet.

## Security

Please consult the [security guide](./SECURITY.md) for our responsible security vulnerability disclosure process

## Contributing

This project is not accepting external contributions at this time. For bugs or enhancement requests, please file a GitHub issue unless it’s security related. When filing a bug remember that the better written the bug is, the more likely it is to be fixed. If you think you’ve found a security vulnerability, do not raise a GitHub issue and follow the instructions in our [security policy](./SECURITY.md).

## License

Copyright (c) 2022, 2023 Oracle and/or its affiliates
Released under the Universal Permissive License v1.0 as shown at
<https://oss.oracle.com/licenses/upl/>.
