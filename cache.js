function sum(a, b) {
  return a + b;
}

function caching(func) {
  let cache = new Map();

  return function(a, b) {
    let key = [a, b].sort((a, b) => a - b).join('+');
    if (cache.has(key)) {
      console.log('from cache');  
      return cache.get(key);
    }

    if (cache.size === 50) {
      let keys = Array.from(cache.keys()).slice(0, 1);
      cache.delete(keys[0]);
    }

    let result = func(a, b);
    cache.set(key, result);
    return result;
  }
}

sum = caching(sum);

console.log(sum(1, 2));
console.log(sum(2, 1));
console.log(sum(2, 2));
console.log(sum(8, 7));
console.log(sum(8, 7));
