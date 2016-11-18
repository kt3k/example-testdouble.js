const axios = require('axios')
const sinon = require('sinon')
const td = require('testdouble')
const assert = require('assert')
const { getGithubProfile, checkMoney } = require('./')

window = { alert: () => {} }

describe('getGithubProfile', () => {
  it('与えられたユーザの github profile を取得する', done => {
    sinon.stub(axios, 'get')
      .withArgs('https://api.github.com/users/mojombo')
      .returns(Promise.resolve({}))

    getGithubProfile('mojombo').then(data => {
      assert.deepEqual(data, {})

      axios.get.restore()

      done()
    })
  })

  it('与えられたユーザの github profile を取得する', done => {
    td.replace(axios, 'get')

    td.when(axios.get('https://api.github.com/users/mojombo'))
      .thenReturn(Promise.resolve({}))

    getGithubProfile('mojombo').then(data => {
      assert.deepEqual(data, {})

      td.reset()

      done()
    })
  })
})

describe('checkMoney @td', () => {
  beforeEach(() => {
    td.replace(window, 'alert')
  })

  afterEach(() => {
    td.reset()
  })

  it('残金が足りない場合は警告ダイアログを表示', () => {
    checkMoney(500, 1000)

    td.verify(window.alert('残金が足りません'))
  })

  it('残金が十分ある場合は警告ダイアログを表示しない', () => {
    checkMoney(1500, 1000)

    assert.throws(() => td.verify(window.alert('残金が足りません')))
  })
})

describe('checkMoney @sinon', () => {
  it('残金が足りない場合は警告ダイアログを表示', () => {
    const mock = sinon.mock(window).expects('alert').withArgs('残金が足りません')

    checkMoney(500, 1000)

    mock.verify()

    window.alert.restore()
  })

  it('残金が十分ある場合は警告ダイアログを表示しない', () => {
    const mock = sinon.mock(window).expects('alert').withArgs('残金が足りません').never()

    checkMoney(1500, 1000)

    mock.verify()

    window.alert.restore()
  })
})
