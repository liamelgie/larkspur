const axios = require('axios')

const larkspur = {
  get: {
    catalogue: {
      on: (board) => _getCatalogue(board)
    },
    archive: {
      on: (board) => _getArchive(board)
    },
    page: (page) => {
      return {
        on: (board) => _getPage(board, page)
      }
    },
    all: {
      threads: {
        on: (board) => _getThreads(board)
      }
    },
    filtered: (filter) => {
      return {
        images: {
          from: {
            thread: (thread) => {
              return {
                on: (board) => _getThreadImages(board, thread, filter)
              }
            }
          }
        }
      }
    },
    images: {
      from: {
        thread: (thread) => {
          return {
            on: (board) => _getThreadImages(board, thread)
          }
        }
      }
    },
    thread: (thread) => {
      return {
        on: (board) => _getThread(board, thread)
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

const _getThreadImages = async (board, thread, filter) => {
  try {
    const response = await _getThread(board, thread)
    const images = []
    for (let post of response.posts) {
      if (post.filename) {
        if (filter) {
          if (post.ext === `.${filter}`) images.push(`http://i.4cdn.org/${board}/${post.tim}${post.ext}`)
        } else {
          images.push(`http://i.4cdn.org/${board}/${post.tim}${post.ext}`)
        }
      }
    }
    return images
  } catch (error) {
    console.error(error)
  }
}

module.exports = larkspur
