const chan = require('../larkspur.js')
const expect = require('chai').expect

describe('Threads', function() {
  this.timeout(10000)
  describe('all', function() {
    it('should retrieve all threads' , async function() {
      const threads = await chan.get.all.threads.on('b')
      expect(threads).to.not.be.null
    })
  })
  describe('specific', function() {
    before(async function() {
      const threads = await chan.get.all.threads.on('b')
      this.testThread = threads[0].threads[4].no
    })
    it('should retrieve a specific thread' , async function() {
      const thread = await chan.get.thread(this.testThread).on('b')
      expect(thread).to.not.be.null
    })
  })
  describe('image retrieval', function() {
    before(async function() {
      const threads = await chan.get.all.threads.on('b')
      this.testThread = threads[0].threads[4].no
    })
    it('should retrieve all images from a specific thread' , async function() {
      const images = await chan.get.images.from.thread(this.testThread).on('b')
      expect(images).to.not.be.null
    })
    it('should retrieve only png files', async function() {
      const images = await chan.get.filtered('png').images.from.thread(this.testThread).on('b')
      expect(images).to.not.be.null
    })
  })
})
