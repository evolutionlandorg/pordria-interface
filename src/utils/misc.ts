export const wait = (delay: number) =>
  new Promise(r => {
    setTimeout(() => r(null), delay)
  })

export const dummy = {}
