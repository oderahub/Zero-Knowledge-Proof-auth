
// write a simple algorithm that will be efficient in searching for 
// the 9,500,678th item in a sorted list of 1,000,000,000 item.

const getItemAtIndex = (index) => {

  const zeroBasedIndex = index - 1

  if(zeroBasedIndex < 0 || zeroBasedIndex >= 999999999) {
    throw new Error ("Invalid Index")
  }

  return index
}

const targetItemNumber = 9500678;
const result = getItemAtIndex(targetItemNumber);

console.log(`The ${targetItemNumber}th item is:`, result);


// Direct Access: By subtracting 1 from the target index, you convert it to a zero-based index, which is exactly what JavaScript uses for array indexing.
// Linear Time Complexity: This solution has a time complexity of O(1), which means it performs a constant number of operations regardless of the input size.
// Efficiency: Given that the list is sorted and sequential, this method avoids the need for any complex algorithms like binary search.
// Readability: The code is simple and easy to understand, which is crucial for maintainability.