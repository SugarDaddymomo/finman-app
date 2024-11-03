// // Function to set a cookie
// export function setCookie(name: string, value: string, days: number) {
//     const expires = new Date();
//     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
// }

// // Function to get a cookie by name
// export function getCookie(name: string): string | null {
//     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     return match ? decodeURIComponent(match[2]) : null;
// }

// // Function to delete a cookie
// export function deleteCookie(name: string) {
//     document.cookie = `${name}=; Max-Age=0; path=/;`;
// }