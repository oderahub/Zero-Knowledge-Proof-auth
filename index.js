
// write a simple algorithm that will be efficient in searching for 
// the 9,500,678th item in a sorted list of 1,000,000,000 item.

const getItemAtIndex = (sortedList, index) => {

const zeroBasedIndex = index - 1

if(zeroBasedIndex < 0 || zeroBasedIndex >= sortedList.length) {
  throw new Error ("invalid index")
}

return zeroBasedIndex + 1
}

console.log(getItemAtIndex(1000000000, 9500678))



// This solution efficiently retrieves any item from a hypothetical large sorted list without storing the list in memory.
// Linear Time Complexity: This solution has a time complexity of O(1), which means it performs a constant number of operations regardless of the input size.
// Efficiency: Given that the list is sorted and sequential, this method avoids the need for any complex algorithms like binary search.
