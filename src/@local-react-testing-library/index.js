import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

const SERVER_URL = 'https://localhost:9000';

const ModifiedWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: ModifiedWrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

export const createApiServer = (handlers) => {
  const myHandlers = handlers.map(({ url, response, method }) => {
    const myUrl = `${SERVER_URL}${url}`;
    const handle = (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(response));
    };

    switch (method) {
      case 'GET':
        return rest.get(myUrl, handle);
      case 'POST':
        return rest.post(myUrl, handle);
      case 'PATCH':
        return rest.patch(myUrl, handle);
      case 'DELETE':
        return rest.delete(myUrl, handle);
      case 'PUT':
        return rest.put(myUrl, handle);
      default:
        return;
    }
  });

  const server = setupServer(...myHandlers);
  return server;
};
