const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');

let binaryPath = '';
if (process.platform === 'darwin') {
  binaryPath = path.join(__dirname, '..', '..', 'out', `Gmail Desktop-darwin-x64`, 'Gmail Desktop.app', 'Contents', 'MacOS', 'Gmail Desktop');
} else if (process.platform === 'linux') {
  binaryPath = path.join(__dirname, '..', '..', 'out', `Gmail Desktop-linux-x64`, 'gmail-desktop');
}

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(function () {
    this.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: binaryPath
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window', function () {
    return this.app.client.getWindowCount()
      .then(function (count) {
        assert.strict.equal(count, 1);
        // Please note that getWindowCount() will return 2 if `dev tools` are opened.
        // assert.equal(count, 2)
      });
  });
});
