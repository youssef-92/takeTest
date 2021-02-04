import { Analytics } from "./analytics";

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



