
<a name="2.1.0"></a>
# 2.1.0 (2016-06-30)

## Updates

- Exposed `$scope.myFrequency` by adding two way bound `frequency` attribute to directive.  See README.md for details.


<a name="2.0.0"></a>
# 2.0.0 (2016-06-27)

## Updates

- new major version because tempaltes built to work with 1.4.2 will not work with this version.
- added new config propert of `allowMultiple` which will allow for multiple cron options (e.g '* * 1,3,4 * *').
- update README.md with new multiselect feature and template instructions
- updated gh-pages demo


<a name="1.4.2"></a>
# 1.4.2 (2015-04-23)

## Updates

- wrapped each step: CSS wrapper was added to the directive as a whole and each step for easier styling.
- changed filter name: Filter names were polluting name space so the prefix `cron` was added.