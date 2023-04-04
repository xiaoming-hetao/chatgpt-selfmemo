import { camelCase, snakeCase } from 'lodash'

// 接口 request 和 response 驼峰转换
export function convertToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item))
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      newObj[camelCase(key)] = convertToCamelCase(obj[key])
    }
    return newObj
  } else {
    return obj
  }
}

export function convertToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToSnakeCase(item))
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      newObj[snakeCase(key)] = convertToSnakeCase(obj[key])
    }
    return newObj
  } else {
    return obj
  }
}
