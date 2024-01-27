const { src, dest, watch } = require('gulp');
const {
  notifyPipeError,
  normalizeOpts,
  prefixGlobs,
  makeDir,
} = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'iconfont', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/i/',
  glob: 'iconfont/*.svg', // which files to use as entry points
  fontName: 'icons',
  formats: ['woff2', 'woff'],
  // scssFile: '', // `options.src`-relative path + filename
  // lessFile: '', // `options.src`-relative path + filename
  // varPrefix: fontName + '-', // Custom prefix for less/css variables.
  // onGlyphs: null, // (glyphs:{ name: string, unicode: string[]}, options: object) => void
};

const fs = require('fs');
const iconfont = require('gulp-iconfont');

const warningMsg = '// This file is auto-generated. DO NOT EDIT! \n\n';

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => new Promise((resolve, reject) => {
    src(prefixGlobs(opts.glob, opts.src), { base: opts.src })
      .pipe(notifyPipeError())
      .pipe(
        iconfont({
          fontName: opts.fontName,
          formats: opts.formats,
          normalize: true,
          fontHeight: 1000,
          timestamp: 1,
        })
      )
      .on('glyphs', (glyphs, options) => {
        makeDir(opts.dist);
        fs.writeFileSync(
          opts.dist + opts.fontName + '.json',
          JSON.stringify(
            glyphs.reduce((iconData, cp) => {
              iconData[cp.name] = cp.unicode[0];
              return iconData;
            }, {}),
            null,
            '\t'
          )
        );
        const varPrefix = opts.varPrefix || opts.fontName + '-';
        if (opts.scssFile) {
          const iconVars = glyphs.map(
            (cp) => '$' + varPrefix + cp.name + ': "' + cp.unicode[0] + '";'
          );
          makeDir(opts.src + opts.scssFile, true);
          fs.writeFileSync(opts.src + opts.scssFile, warningMsg + iconVars.join('\n'));
        }
        if (opts.lessFile) {
          const iconVars = glyphs.map(
            (cp) => '@' + varPrefix + cp.name + ': ' + cp.unicode[0] + ';'
          );
          makeDir(opts.src + opts.lessFile, true);
          fs.writeFileSync(opts.src + opts.lessFile, warningMsg + iconVars.join('\n'));
        }
        if (opts.onGlyps) {
          opts.onGlyps(glyphs, options);
        }
      })
      .pipe(dest(opts.dist))
      .on('end', resolve)
      .on('error', reject);
    });

  bundleTask.displayName = opts.name;

  const watchTask = () => watch(prefixGlobs(opts.glob, opts.src), bundleTask);

  watchTask.displayName = opts.name + '_watch';

  const ret = [bundleTask, watchTask];
  ret.bundle = bundleTask;
  ret.watch = watchTask;

  return ret;
};
