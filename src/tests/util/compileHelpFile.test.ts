import test from 'ava'

import Modules from '../../module'
import { compileHelpFile, compileHelpPage } from '../../util/compileHelpFile'

test('generates help page correctly', t => {
  const helpPage = compileHelpPage()
  t.is(helpPage.length, Modules.length, 'has correct module count')

  t.is(helpPage[0].module, Modules[0].name, 'has correct module name')
  t.is(helpPage[0].description, Modules[0].description, 'has correct module description')
  t.is(helpPage[0].id, `=help ${Modules[0].id}`, 'has correct module id')
})

test('generates help file correctly', t => {
  const module = Modules[0]
  const helpFile = compileHelpFile(module.id)

  t.is(helpFile.name, module.name, 'has correct module name')
  t.is(helpFile.description, module.description, 'has correct module description')
  t.is(helpFile.help.length, module.commands.length, 'has correct command count')
})

test('handled invalid module help file generation', t => {
  t.throws(() => compileHelpFile('nothing'))
})