/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileForm from './ProfileForm';

const mockNavigate = jest.fn();
const mockSetLocalStorage = jest.fn();
const mockRemoveLocalStorage = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

jest.mock('services/local-storage.service', () => ({
  setToLocalStorage: () => mockSetLocalStorage,
  getFromLocalStorage: () => false,
  removeFromLocalStorage: () => mockRemoveLocalStorage,
}))

const setup = () => render(<ProfileForm />)

describe('Profile form tests', () => {

  it('should render Checkbox', async () => {
    setup()
    const checkboxLabel = screen.getByLabelText('Show weekends on calendar')

    await act(async () => {
      fireEvent.click(checkboxLabel);
    });

    expect(checkboxLabel).toBeChecked()
  });

  it('should render button log out', async () => {
    setup()
    const button = screen.getByTestId('button-log-out')

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toBeInTheDocument()
    expect(mockNavigate).toBeCalled()
  });
})
