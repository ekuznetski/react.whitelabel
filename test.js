const path = require('path');

const from = './src/components/pages/main/about/_bsfx/components/pageTopSection/+PageTopSection.scss',
  to = './src/components/pages/main/about/components/pageTopSection/PageTopSection.scss';

console.log(
  path.relative(from, to).replace(/[\\/]/g, '/').slice(3)
);
