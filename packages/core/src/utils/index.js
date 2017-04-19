export function keyGen() {
  let key = '';
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 10; i > 0; --i) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}
