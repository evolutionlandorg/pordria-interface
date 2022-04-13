export const wait = (delay: number) =>
  new Promise(r => {
    setTimeout(() => r(null), delay)
  })

export const formateDate = (timestamp?: string | Date | number | null) => {
  if (timestamp === null) {
    return 'never expire'
  }

  if (!timestamp) {
    return '-'
  }

  const date = new Date(timestamp)
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const isHTTP = (link: string) => /^http(s)?:\/\//.test(link)
