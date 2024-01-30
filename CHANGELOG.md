# Change Log

## Upcoming...

- ... <!-- Add new lines here. Version number will be decided later -->
- fix: Accept the `onGlyphs` option, but still silently support the typo `onGlyps`

## 0.4.2

_2024-01-30_

- feat: Add TypeScript types and JSDoc comments

## 0.4.1

_2024-01-27_

- feat: Make iconfont task function return a `Promise`
- feat: Make watch task return a node `FSWatcher` object

## 0.4.0

_2022-04-19_

- feat: Upgrade `gulp-iconfont` dependency to gain support for node@14
- feat: Set `pkg.engines.node` to `>=12`

## 0.3.1 – 0.3.2

_2020-03-12_

- feat: Prefix sass variables with `fontName+'-'` unless `varPrefix` is set
- fix: Make `scssFile` and `lessFile` folders inside `src` folder

## 0.3.0

_2020-03-11_

- **BREAKING** feat: `scssFile` now defines simple `${svg-name}` variables

## 0.2.0

_2020-02-21_

- feat: drop `ttf` from defaults

## 0.1.2

_2019-06-21_

- fix: `formats` option wasn't being applied

## 0.1.1

_2019-06-20_

- fix: Only watch globs

## 0.1.0

_2019-05-27_

- feat: Initial commit
