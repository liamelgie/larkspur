const chan = require('../larkspur.js')
const expect = require('chai').expect

describe('Threads', function() {
  this.timeout(10000)
  describe('all', function() {
    it('should retrieve all threads' , async function() {
      const threads = await chan.get.all.threads.from('b')
      expect(threads).to.not.be.null
    })
  })
  describe('specific', function() {
    before(async function() {
      const threads = await chan.get.all.threads.from('b')
      this.testThread = threads[0].threads[4].no
    })
    it('should retrieve a specific thread' , async function() {
      const thread = await chan.get.thread(this.testThread).from('b')
      expect(thread).to.not.be.null
    })
  })
})
