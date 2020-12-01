import { addTrailingSlash } from './url';

describe('addTrailingSlash', () => {
  it('should add slash if it is not presented', () => {
    expect(addTrailingSlash('/api/v1')).toBe('/api/v1/');
  });
  it('should keep slash if it is presented', () => {
    expect(addTrailingSlash('/api/v1/')).toBe('/api/v1/');
  });
  it('should keep single slash', () => {
    expect(addTrailingSlash('/')).toBe('/');
  });
  it('should keep empty string', () => {
    expect(addTrailingSlash('')).toBe('');
  });
  it('should keep undefined', () => {
    expect(addTrailingSlash(undefined)).toBe(undefined);
  });
  it('should keep null', () => {
    expect(addTrailingSlash(null)).toBe(null);
  });
});
