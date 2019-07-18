const generateMockData = function () {
  const mockURLs = [];
  for (let i = 1; i < 52; i += 1) {
    const currentString = i.toString().padStart(4, '0');
    const currentURL = `https://fecimagemodal.s3-us-west-2.amazonaws.com/images/${currentString}.jpg`;
    mockURLs.push(currentURL);
  }
  return mockURLs;
};

const mockImages = generateMockData();

module.exports = {
  mockImages,
  generateMockData,
};
