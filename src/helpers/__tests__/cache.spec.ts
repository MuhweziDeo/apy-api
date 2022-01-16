import * as helpers from '../cache';

describe('Cache', () => {
    it('should retrive cached results', () => {
        helpers.cacheItem('foo', 'bar');
        const result = helpers.getCachedItem('foo');
        expect(result).toBe('bar');
    })

    it('should store results in cache', () => {
       const setSpy = jest.spyOn(helpers.cache, 'set');
        const saved = helpers.cacheItem('foo', 'bar');
        expect(saved).toBeTruthy();
        expect(setSpy).toHaveBeenCalled();
    })
})