const chan = require('../larkspur.js')
const expect = require('chai').expect

describe('Boards', function() {
  this.timeout(10000)
  describe('catalog', function() {
    it('should retrieve the catalog' , async function() {
      const catalogue = await chan.get.catalogue.from('b')
      expect(catalogue).to.not.be.null
    })
  })
  describe('archive', function() {
    it('should retrieve archived posts' , async function() {
      const archive = await chan.get.archive.from('a')
      expect(archive).to.not.be.null
    })
  })
  describe('page', function() {
    it('should retrieve a page' , async function() {
      const page = await chan.get.page(1).from('b')
      expect(page).to.not.be.null
    })
  })
})
