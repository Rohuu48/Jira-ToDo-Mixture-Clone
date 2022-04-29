import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  waitFor,
  screen
} from '../../@local-react-testing-library';
import Login from './index';
import { loginUser } from 'actions/auth';

/*
Login page testing
  should contain input fields 
  should throw required error when pressed sign In with empty fields 
when fields are valid
    should show loader when clicked on Sign In 
    should call loginUser function when clicked on signedIn 
    should call updateLoginType function when clicked on signedIn 
    should call updateLoginType with as Admin false when admin is not checked
    should call updateLoginType with as Admin true when admin is checked 
    should show an alert when logged in with invalid credentials 
*/

describe('Login page testing', () => {
  let wrapper;
  const loginUserFn = jest.fn();
  const updateLoginTypeFn = jest.fn();

  const history = {
    replace: () => {}
  };

  beforeEach(() => {
    wrapper = render(<Login />);
  });

  test('should contain input fields', () => {
    screen.getByLabelText('Email Address');
    screen.getByLabelText('Password');
    screen.getByText('Login', { selector: 'button' });
  });

  // test('should throw required error when pressed sign In with empty fields', () => {
  //   const signInButton = screen.getByText('Sign In', { selector: 'button' });
  //   fireEvent.click(signInButton);
  //   screen.getByText('email is required.');
  //   screen.getByText('password is required.');
  // });

  describe('when fields are valid', () => {
    beforeEach(() => {
      const email = screen.getByLabelText('Email Address');
      const password = screen.getByLabelText('Password');
      fireEvent.change(email, { target: { value: 'abcd@gmail.com' } });
      fireEvent.change(password, { target: { value: '123456' } });
    });

    test('should show loader when clicked on Login', async () => {
      const loginButton = screen.getByText('Login', { selector: 'button' });
      fireEvent.click(loginButton);
      await waitFor(() => screen.getByTestId('activity_indicator'));
    });

    // test('should call loginUser function when clicked on signedIn', async () => {
    //   await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1));
    // });

    //   test('should call updateLoginType function when clicked on signedIn', async () => {
    //     const signInButton = screen.getByText('Sign In', { selector: 'button' });
    //     fireEvent.click(signInButton);
    //     await waitFor(() => expect(updateLoginTypeFn).toHaveBeenCalledTimes(1));
    //   });

    //   test('should call updateLoginType with as Admin false when admin is checked', async () => {
    //     const signInButton = screen.getByText('Sign In', { selector: 'button' });
    //     fireEvent.click(signInButton);
    //     await waitFor(() => {
    //       return expect(updateLoginTypeFn).toHaveBeenCalledWith({
    //         isLoggedInAsAdmin: false
    //       });
    //     });
    //   });

    //   test('should call updateLoginType with as Admin true when admin is checked', async () => {
    //     const adminCheckBox = screen.getByText('Admin');
    //     fireEvent.click(adminCheckBox);
    //     const signInButton = screen.getByText('Sign In', {
    //       selector: 'button'
    //     });
    //     fireEvent.click(signInButton);
    //     await waitFor(() => {
    //       return expect(updateLoginTypeFn).toHaveBeenCalledWith({
    //         isLoggedInAsAdmin: true
    //       });
    //     });
    //   });

    //   test('should show an alert when logged in with invalid credentials', async () => {
    //     wrapper.rerender(
    //       <Login
    //         loginUser={() => Promise.reject('Invalid credentials')}
    //         updateLoginType={updateLoginTypeFn}
    //       />
    //     );
    //     const signInButton = screen.getByText('Sign In', { selector: 'button' });
    //     fireEvent.click(signInButton);
    //     await waitFor(() => screen.getByTestId('alert'), { timeout: 5 * 1000 });
    //   });
  });
});
