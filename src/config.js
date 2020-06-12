const config = {
  api: (process.env.NODE_ENV === 'development') ? 'http://dev.local/api/' : '/api/',
  url: (process.env.NODE_ENV === 'development') ? 'http://dev.local/api' : '/api',
  date: {
    server: 'YYYY-MM-DD',
    displayDate: 'DD.MM.YYYY',
    displayDateTime: 'DD.MM.YYYY HH:mm',
    serverDateTime: 'YYYY-MM-DD HH:mm:ss',
    displayYear: 'YYYY',
    serverTime: 'HH:mm:ss'
  }
}

export default config
