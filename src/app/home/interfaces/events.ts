// Generated by https://quicktype.io

export interface EventsResponse {
    _embedded: EventsResponseEmbedded;
    _links:    EventsResponseLinks;
    page:      Page;
}

export interface EventsResponseEmbedded {
    events: Event[];
}

export interface Event {
    name:            string;
    type:            EventType;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    images:          Image[];
    distance:        number;
    units:           Units;
    sales:           Sales;
    dates:           Dates;
    seatmap?:        SeatMap;
    classifications: EventClassification[];
    promoter?:        Promoter;
    promoters?:       Promoter[];
    priceRanges?:     PriceRange[];
    _links:          EventLinks;
    _embedded:       EventEmbedded;
}

export interface SeatMap {
    staticUrl: string;
}

export interface EventEmbedded {
    venues:      Venue[];
    attractions: Attraction[];
}

export interface Attraction {
    name:            string;
    type:            AttractionType;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    externalLinks?:  ExternalLinks;
    images:          Image[];
    classifications: AttractionClassification[];
    upcomingEvents:  { [key: string]: number };
    _links:          AttractionLinks;
}

export interface AttractionLinks {
    self: First;
}

export interface First {
    href: string;
}

export interface AttractionClassification {
    primary:  boolean;
    segment:  Promoter;
    genre:    Promoter;
    subGenre: Promoter;
    type:     Promoter;
    subType:  Promoter;
    family:   boolean;
}

export interface Promoter {
    id:   string;
    name: string;
}

export interface ExternalLinks {
    youtube:      Facebook[];
    itunes?:      Facebook[];
    facebook:     Facebook[];
    spotify:      Facebook[];
    instagram:    Facebook[];
    homepage?:    Facebook[];
    twitter?:     Facebook[];
    musicbrainz?: Musicbrainz[];
    wiki?:        Facebook[];
    lastfm?:      Facebook[];
}

export interface Facebook {
    url: string;
}

export interface Musicbrainz {
    id: string;
}

export interface Image {
    ratio:    Ratio;
    url:      string;
    width:    number;
    height:   number;
    fallback: boolean;
}

export enum Ratio {
    The16_9 = "16_9",
    The3_2 = "3_2",
    The4_3 = "4_3",
}

export enum Locale {
    EnUs = "en-us",
}

export enum AttractionType {
    Attraction = "attraction",
}

export interface Venue {
    name:           string;
    type:           VenueType;
    id:             string;
    test:           boolean;
    url:            string;
    locale:         Locale;
    distance:       number;
    units:          Units;
    postalCode:     string;
    timezone:       Timezone;
    city:           City;
    state:          City;
    country:        Country;
    address:        Address;
    location:       Location;
    upcomingEvents: UpcomingEvents;
    _links:         AttractionLinks;
    images?:        Image[];
}

export interface Address {
    line1: Line1;
}

export enum Line1 {
    CAlmogàvers122 = "C. Almogàvers, 122",
    CarrerAlmogàvers122 = "Carrer Almogàvers, 122",
    CarrerDePamplona88 = "Carrer de Pamplona, 88",
    CarrerDelsAlmogàvers88 = "Carrer dels Almogàvers, 88",
}

export interface City {
    name: CityName;
}

export enum CityName {
    Barcelona = "Barcelona",
}

export interface Country {
    name:        CountryName;
    countryCode: CountryCode;
}

export enum CountryCode {
    Es = "ES",
}

export enum CountryName {
    Spain = "Spain",
}

export interface Location {
    longitude: string;
    latitude:  string;
}

export enum Timezone {
    EuropeMadrid = "Europe/Madrid",
}

export enum VenueType {
    Venue = "venue",
}

export enum Units {
    Miles = "MILES",
}

export interface UpcomingEvents {
    _total:    number;
    "mfx-es":  number;
    _filtered: number;
}

export interface EventLinks {
    self:        First;
    attractions: First[];
    venues:      First[];
}

export interface EventClassification {
    primary:  boolean;
    segment:  Promoter;
    genre:    Promoter;
    subGenre: Promoter;
    family:   boolean;
}

export interface Dates {
    access?:          Access;
    start:            Start;
    timezone:         Timezone;
    status:           Status;
    spanMultipleDays: boolean;
}

export interface Access {
    startDateTime:    string;
    startApproximate: boolean;
    endApproximate:   boolean;
}

export interface Start {
    localDate:      string;
    localTime:      string;
    dateTime:       string;
    dateTBD:        boolean;
    dateTBA:        boolean;
    timeTBA:        boolean;
    noSpecificTime: boolean;
}

export interface Status {
    code: Code;
}

export enum Code {
    Cancelled = "cancelled",
    Onsale = "onsale",
    Rescheduled = "rescheduled",
}

export interface PriceRange {
    type:     PriceRangeType;
    currency: Currency;
    min:      number;
    max:      number;
}

export enum Currency {
    Eur = "EUR",
}

export enum PriceRangeType {
    Standard = "standard",
    StandardIncludingFees = "standard including fees",
}

export interface Sales {
    public: Public;
}

export interface Public {
    startDateTime: string;
    startTBD:      boolean;
    startTBA:      boolean;
    endDateTime:   string;
}

export enum EventType {
    Event = "event",
}

export interface EventsResponseLinks {
    first: First;
    self:  First;
    next:  First;
    last:  First;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
