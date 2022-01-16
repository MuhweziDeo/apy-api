import Cache from 'lru-cache';

const options  = { max: 500, maxAge: 1000 * 60 * 60 }

export const cache = new Cache(options)

export const cacheItem = (key: string, data: string) => {
    return cache.set(key, data)
}

export const getCachedItem = (key: string): string => {
    return cache.get(key) as string;
}