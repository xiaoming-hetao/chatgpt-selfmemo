export interface Emotions {
  id: number
  content: string
  score: number
  tag: string
  tags: string[]
  reply: string
  createTime: string
  updateTime: string
}

// 格式化时间
export enum Week {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface MoodRate {
  date: string
  score: number
}
