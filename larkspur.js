const axios = require('axios')

const larkspur = {
  catalog: (boardName) => {
    const cata = new Catalog(boardName)
  },
  thread: (boardName, threadNumber) => {
    const thread = new Thread(boardName, threadNumber)
  }
}

class Board {
  constructor(boardName) {
    this.boardName = boardName
    this.catalog = this_getCatalog(boardName)
  }

  _getCatalog(boardName) {
    return new Catalog(boardName)
  }
}

class Catalog {
  constructor(boardName) {
    this._data = this._sendAPIRequest(boardName)
      .then((data) => this._parseAPIResponse(boardName, data))
  }

  async _sendAPIRequest(boardName) {
    const response = await axios.get(`http://a.4cdn.org/${boardName}/catalog.json`)
    .then(data => data.data)
    return response
  }

  _parseAPIResponse(boardName, APIResponse) {
    const pages = this._parsePages(boardName, APIResponse)
  }

  _parsePages(boardName, pagesData) {
    const p = {}
    for (let pageData of pagesData) {
      p[pageData.page] = new CatalogPage(boardName, pageData)
    }
    return p
  }
}

class CatalogPage {
  constructor(boardName, pageData) {
    this.pageNumber = pageData.page
    this.threads = this._parseThreadPreviews(boardName, pageData.threads)
  }

  _parseThreadPreviews(boardName, threadsData) {
    const t = {}
    for (let threadData of threadsData) {
      t[threadData.no] = new ThreadPreview(boardName, threadData)
    }
    return t
  }
}

class Thread {
  constructor(boardName, threadNumber) {
    this._data = this._sendAPIRequest(boardName, threadNumber)
      .then((data) => this._parseAPIResponse(data))
  }

  async _sendAPIRequest(boardName, threadNumber) {
    const response = await axios.get(`http://a.4cdn.org/${boardName}/thread/${threadNumber}.json`)
    .then(data => data.data)
    return response
  }

  _parseAPIResponse(APIResponse) {
    const thread = this._parseThread(APIResponse)
  }

  _parseThread(threadData) {
    const thread = {
      no: threadData.posts[0].no,
      time: threadData.posts[0].now,
      semanticURL: threadData.posts[0].semanticURL,
      replies: threadData.posts[0].replies,
      images: threadData.posts[0].images,
      uniqueIPs: threadData.posts[0].unique_ips,
      posts: this._parsePosts(threadData.posts)
    }
  }

  _parsePosts(postsData) {
    const p = {}
    for (let post of postsData) {
      p[post.no] = new Post(post)
    }
    return p
  }
}

class ThreadPreview {
  constructor(boardName, threadData) {
    this.no = threadData.no
    this.now = threadData.now
    this.name = threadData.name
    this.comment = threadData.com
    this.time = threadData.time
    this.replyTo = threadData.resto
    this.bumpLimit = threadData.bumplimit
    this.imageLimit = threadData.imageLimit
    this.semanticURL = threadData.semantic_url
    this.replyCount = threadData.replies
    this.imageCount = threadData.images
    this.omitted = {
      posts: threadData.omitted_posts,
      images: threadData.omitted_images
    }
    this.lastReplies = threadData.last_replies
    this.lastModified = threadData.last_modified
    this.image = new Image({
      filename: threadData.filename,
      ext: threadData.ext,
      width: threadData.width,
      height: threadData.height,
      tn_w: threadData.tn_w,
      tn_h: threadData.tn_h,
      tim: threadData.tim,
      md5: threadData.md5,
      fsize: threadData.fsize
    })
  }
}

class Post {
  constructor(postData) {
    this.no = postData.no
    this.now = postData.now
    this.name = postData.name
    this.com = postData.com || undefined
    this.time = postData.time
    this.replyTo = postData.resto
    this.bumpLimit = postData.bumplimit || undefined
    this.imageLimit = postData.imageLimit || undefined
    this.semanticURL = postData.semantic_url || undefined
    this.replyCount = postData.replies || undefined
    this.imageCount = postData.images || undefined
    this.image = new Image({
      fsize: postData.fsize,
      md5: postData.md5,
      tim: postData.tim,
      filename: postData.filename,
      ext: postData.ext,
      w: postData.w,
      h: postData.h,
      tn_h: postData.tn_h,
      tn_w: postData.tn_w
    }) || undefined
  }
}

class Image {
  constructor(imageData) {
    this.filename = imageData.filename
    this.ext = imageData.ext
    this.width = imageData.w
    this.height = imageData.h
    this.thumbnail = {
      height: imageData.tn_h,
      width: imageData.tn_w
    }
    this.tim = imageData.tim
    this.md5 = imageData.md5
    this.filesize = imageData.fsize
  }
}

class ThreadCollection extends Array {
  constructor(...threads) {
    super(threads)
  }
}

class PostCollection extends Array {
  constructor(...posts) {
    super(posts)
  }
}

class ImageCollection extends Array {
  constructor(...images) {
    super(images)
  }
}

module.exports = larkspur
