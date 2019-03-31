const axios = require('axios')

const larkspur = {
  get: {
    catalogue: {
      from: (board) => _getCatalogue(board)
    },
    archive: {
      from: (board) => _getArchive(board)
    },
    page: (page) => {
      return {
        from: (board) => _getPage(board, page)
      }
    },
    all: {
      threads: {
        from: (board) => _getThreads(board)
      }
    },
    thread: (thread) => {
      return {
        from: (board) => _getThread(board, thread)
      }
    }
  }
}

const _getCatalogue = async (board) => {
    try {
      const response = await axios.get(`http://a.4cdn.org/${board}/catalog.json`)
      .then(data => data.data)
      return response
    } catch (error) {
      console.error(error)
    }
}

const _getArchive = async (board) => {
  try {
    const response = await axios.get(`http://a.4cdn.org/${board}/archive.json`)
    .then(data => data.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

const _getPage = async (board, page) => {
  try {
    const response = await axios.get(`http://a.4cdn.org/${board}/${page}.json`)
    .then(data => data.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

const _getThreads = async (board) => {
  try {
    const response = await axios.get(`http://a.4cdn.org/${board}/threads.json`)
    .then(data => data.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

const _getThread = async (board, thread) => {
  try {
    const response = await axios.get(`http://a.4cdn.org/${board}/thread/${thread}.json`)
    .then(data => data.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

module.exports = larkspur
