import jwt_decode from 'jwt-decode'

export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (!token) {
      return false
    }
    const decode: any = jwt_decode(token)
    // 校验token是否过期
    const nowTime = Date.now()
    const expireTime = decode.exp

    if (expireTime * 1000 < nowTime) {
      return false
    }
  }

  return true
}
