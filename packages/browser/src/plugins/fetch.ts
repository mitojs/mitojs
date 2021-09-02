import { EVENTTYPES } from '@mitojs/shared'
import { getTimestamp, replaceOld, _global } from '@mitojs/utils'
import { voidFun } from '@mitojs/types'

const FetchPlugins = {
  name: EVENTTYPES.FETCH,
  monitor: () => {
    fetchReplace()
    // replace and subscribe
  },
  listener: () => {}
}

function fetchReplace(): void {
  if (!('fetch' in _global)) {
    return
  }
}
