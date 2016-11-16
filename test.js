const axios = require('axios')
const sinon = require('sinon')
const td = require('testdouble')
const assert = require('assert')
const { getGithubProfile } = require('./')

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
