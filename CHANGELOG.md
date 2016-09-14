<a name="3.0.4"></a>
# 3.0.4 (2016-09-14)

## Updates

- Code Style Cleanup

<a name="3.0.1"></a>
# 3.0.1 (2016-07-18)

## Updates

- Bug fixes in default tempalte.
- Bug fix with allowMultiple reference inside directive.

<a name="3.0.0"></a>
# 3.0.0 (2016-07-18)

## Updates

- Combined `init` and `output` to use Angular's `ngModel`.
- Updated variable names to make more sense.
- Updates to single vs. multiple config, `$scope.frequency` now has numbers for single and array for multiple.

<a name="2.1.1"></a>
# 2.1.1 (2016-06-30)

## Updates

- Correcting build file error.


<a name="2.1.0"></a>
# 2.1.0 (2016-06-30)

## Updates

- Exposed `$scope.myFrequency` by adding two way bound `frequency` attribute to directive.  See README.md for details.


<a name="2.0.0"></a>
# 2.0.0 (2016-06-27)

## Updates

- new major version because tempaltes built to work with 1.4.2 will not work with this version.
- added new config propert of `allowMultiple` which will allow for multiple cron options (e.g '* * 1,3,4 * *').
- update README.md with new multiselect feature and template instructions.
- updated gh-pages demo.


<a name="1.4.2"></a>
# 1.4.2 (2015-04-23)

## Updates

- wrapped each step: CSS wrapper was added to the directive as a whole and each step for easier styling.
- changed filter name: Filter names were polluting name space so the prefix `cron` was added.