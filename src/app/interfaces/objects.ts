export interface Contact{
    shortName: string
    name: string
    description:string
    image: string
    template: string
    created: string
    updated: string
    plan: string
    culture: string
    analytics: Analytics
    favorite?:boolean
}

export interface Analytics {
  user:User
  message: Message
}

export interface User {
  total: number
  actived: number
}

export interface Message {
  received:number
  sent: number
}
