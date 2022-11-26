export const reChannel = /(\s|^)\/([a-zA-Z0-9]+)/ig
export const reProject = /(^|\s)(~[a-z\d-]+)/ig
export const reMood = /(^|\s)(:([++]|[+]|[=]|[-]|[--])+)/ig
export const reTime = /(^|\s)(;[\d]+)/ig
export const reTag = /(^|\s)(#[a-z\d-]+)/ig
export const reUrl = /((https?):\/\/(?!\S+(?:png|gif|jpe?g|mp3|ogg|wav))(([-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_+.~#?&//=]*)))/g
