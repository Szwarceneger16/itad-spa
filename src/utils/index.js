

export function popElement (inputArray, comparator) {
    const index= inputArray.findIndex(el => comparator(el));
    if (index < 0) return null;
    return inputArray.splice( index,1)[0];
}

export function createRouteComparator(name) {
    return el => (el.name === name);
  }
  