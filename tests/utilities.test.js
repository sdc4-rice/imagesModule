const s3mock = require('../server/s3mock');
const seeder = require('../server/seeder');
const databaseConnection = require('../server/database');

describe('generateMockData and MockImages', () => {
  test('Return value of generateMockData to an array', () => {
    expect(Array.isArray(s3mock.generateMockData())).toBe(true);
  });

  test('Expect mgnereateMockData to return 51 items', () => {
    expect(s3mock.mockImages.length).toBe(51);
  });

  test('Return value mockImages() function to include image required image links', () => {
    expect(s3mock.mockImages).toContainEqual('https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0001.jpg', 'https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0020.jpg', 'https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0030.jpg',
      'https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0040.jpg',
      'https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0051.jpg');
  });
});


describe('getRandomImageCount', () => {
  test('GetRandomImageCount to return a number between 3 and 5', () => {
    for (let i = 0; i < 10; i += 1) {
      expect(seeder.getRandomImageCount()).toBeGreaterThanOrEqual(3);
      expect(seeder.getRandomImageCount()).toBeLessThanOrEqual(5);
    }
  });
});

describe('getRandomImageURL', () => {
  test('GetRandomImageURL to return a string subset of s3 url', () => {
    const { mockImages } = s3mock;
    expect(seeder.getRandomImageURL()).toContain('fecimagemodal.s3-us-west-2.amazonaws.com/images/');
  });
});
