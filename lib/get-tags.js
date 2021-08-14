// Removes duplicates from an array and returns an object
// with a count of the members

export default function removeDuplicatesAndCount(array) {
    var result = {};
    var i = array.length;

    while (i--) {

        // If member is a duplicate, increment count and delete it      
        if (result.hasOwnProperty(array[i])) {
            result[array[i]]++;
            array.splice(i, 1);

            // Otherwise, just add it to the results 
        } else {
            result[array[i]] = 1;
        }
    }

    // convert results to the desired object format
    return Object.keys(result).map(function (p) { return { tag: p, count: result[p] }; });
}