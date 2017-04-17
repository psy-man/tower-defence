import './index.scss';
import App from './app/app';

const app = new App();

app
  .preload()
  .then(() => {
    document.getElementById('loading').remove();

    app.bootstrap()
  });


