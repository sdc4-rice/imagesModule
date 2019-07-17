const generateMockData = function () {
  const mockURLs = [];
  for (let i = 1; i < 52; i += 1) {
    if (i < 10) {
      const currentURL = `https://fecimagemodal.s3-us-west-2.amazonaws.com/images/000${i}.jpg`;
      mockURLs.push(currentURL);
    } else if (i >= 10 && i < 100) {
      const currentURL = `https://fecimagemodal.s3-us-west-2.amazonaws.com/images/00${i}.jpg`;
      mockURLs.push(currentURL);
    } else if (i >= 100 && i < 1000) {
      const currentURL = `https://fecimagemodal.s3-us-west-2.amazonaws.com/images/0${i}.jpg`;
      mockURLs.push(currentURL);
    }
  }
  return mockURLs;
};

const mockImages = generateMockData();

module.exports = {
  mockImages,
  generateMockData,
};
