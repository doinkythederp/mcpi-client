/** @type {Record<string, (filenames: string[]) => string[]>} */
module.exports = {
  '*.ts': (filenames) => [`eslint ${filenames.join(' ')}`, 'tsc -p tsconfig.json --noEmit']
}
