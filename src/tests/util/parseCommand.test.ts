import test from 'ava'

import parseCommand from '../../util/parseCommand'

test('parses no-args command correctly', t => {
  const command = '=help'
  const parsed = parseCommand('=', command)

  t.is(parsed.command, 'help', 'command is help')
})

test('parses command with arguments correctly', t => {
  const command = '=echo test 123'
  const parsed = parseCommand('=', command)

  t.is(parsed.command, 'echo', 'command is echo')
  t.is(parsed.body, 'test 123', 'command has body')
  t.is(parsed.args.length, 2, 'command has 2 arguments')
})

test('throws exception when sent invalid command', t => {
    t.throws(() => parseCommand('=', 'help'))
    t.throws(() => parseCommand('=', '='))
})
