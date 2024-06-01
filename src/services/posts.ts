export function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());
}
