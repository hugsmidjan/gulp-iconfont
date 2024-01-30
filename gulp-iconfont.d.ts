type TaskFn = {
  (): Promise<void>;
  displayName: string;
}
type WatchFn = {
  (): FSWatcher;
  displayName: string;
}

/**
 * This gulp plugin generates tasks that emit a set of font-files along with
 * the JSON file `{{options.fontName}}.json` which can be consumed by scripts
 * or other gulp tasks.
 * 
 * @see https://github.com/hugsmidjan/gulp-iconfont/blob/master/README.md
 */
export default function plugin (options?: {
  /**
   * The display name (prefix) of the generated tasks
   * 
   * Default: `"iconfont"`
   */
  name?: string;
  /**
   * Path to the source directory from which to resolve the file `glob` option
   * 
   * Default: `"src/"`
   */
  src?: string;
  /**
   * Path where the iconfont files should be saved
   * 
   * Default: `"pub/i/"`
   */
  dist?: string;
  /**
   * Which SVG icon files to glob up and turn into a font file
   * 
   * Default: `"iconfont/*.svg"`
   */
  glob?: string | Array<string>;

  /**
   * Font-family name for the generated font
   * 
   * Default: `"icons"`
  */
  fontName?: string,

  /**
   * Font file formats to generate
   * 
   * Default: `['woff2', 'woff']`
   */
  formats?: Array<'woff2' | 'woff' | 'ttf' | 'eot'>,

  /**
   * Generate file with named SCSS variables mapping from icon name to codepoint.
   * 
   * Declare the path+filename of the file to generate, relative to `options.src`.
   * 
   * Default: `undefined`
  */
  scssFile?: string, 

  /**
   * Generate file with named LESS variables mapping from icon name to codepoint.
   * 
   * Declare the path+filename of the file to generate, relative to `options.src`.
   * 
   * Default: `undefined`
  */
  lessFile?: string, 

  /**
   * Custom prefix for less/css variables.
   * 
   * Default: `options.fontName + '-'`
  */
  varPrefix?: string,

  /**
   * Callback function to be called for each when the font is generated.
   * 
   * Default: `undefined`
   */
  onGlyphs?: (glyphs:Array<{ name: string, unicode: string[]}>, options: Record<string, unknown>) => void

}): [bundle: TaskFn, watch: WatchFn] & {
  bundle: TaskFn;
  watch: WatchFn;
};
