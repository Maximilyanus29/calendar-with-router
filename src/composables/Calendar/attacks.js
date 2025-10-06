export function useGetAttaks() {
  const attacks = [
    {
      start: '2025-10-04 08:00:00',
      end: '2025-10-06 18:00:00',
    },
    {
      start: '2025-10-02 08:00:00',
      end: '2025-10-04 18:00:00',
    },
    {
      start: '2025-10-0608:00:00',
      end: '2025-10-07 18:00:00',
    },
  ]

  return process(attacks)
}

function process(attacks) {
  let result = []

  attacks.forEach((item) => {
    if (!result[item.start]) {
      result[item.start] = []
    }

    if (!result[item.end]) {
      result[item.end] = []
    }

    if (item.end === item.start) {
      result[item.start].push(item)
    } else {
      result[item.start].push(item)
      result[item.end].push(item)
    }
  })

  console.log(result)

  return result
}
