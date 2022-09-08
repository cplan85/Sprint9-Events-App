import { Image } from './events';
export interface AppEvent {
    id?: string,
    name: string,
    date: string,
    url: string,
    startTime: string,
    img: string,
    min: number,
    max: number,
    venue: string,
    venueImages:  Image[] | undefined,
    venueUrl: string,
    address: string,
    promoter?: string,
    type: string,
    lat: number,
    long: number,
}