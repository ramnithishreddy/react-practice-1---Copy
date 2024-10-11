import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, useCart } from '../amazon/cartProvider';
import ItemDetails from '../amazon/itemDetails';

jest.mock('../amazon/cartProvider'); // Mock the cart provider
const mockedAddToCart = jest.fn();
const mockedBuyNow = jest.fn();
useCart.mockReturnValue({ addToCart: mockedAddToCart, buyNow: mockedBuyNow });

describe('ItemDetails Component', () => {
    const itemMock = {
        title: 'Sample Item',
        Price: 100,
        Qty: 1,
        TQty: 10,
        image: 'sample-image-url',
        description: 'This is a sample item description.',
    };

    beforeEach(() => {
        render(
            <Router>
                <CartProvider initialEntries={[{ pathname: '/item', state: itemMock }]}>
                    <ItemDetails />
                </CartProvider>
            </Router>
        );
    });

    //   it('should renders item details correctly', () => {
    //     screen.debug()
    //     expect(screen.getByText(/Sample Item/i)).toBeInTheDocument();
    //     expect(screen.getByText(/100/i)).toBeInTheDocument();
    //     expect(screen.getByText(/This is a sample item description/i)).toBeInTheDocument();
    //     expect(screen.getByRole('combobox')).toBeInTheDocument();
    //   });

    //   it('updates quantity selection', () => {
    //     const select = screen.getByRole('combobox');
    //     fireEvent.change(select, { target: { value: '3' } });

    //     expect(select.value).toBe('3');
    //   });

    // it('adds item to cart when button is clicked', () => {
    //     fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    //     fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

    //     expect(mockedAddToCart).toHaveBeenCalledWith({ ...itemMock, Qty: 2 });
    // });

    //   it('alerts when quantity is not selected on Add to Cart', () => {
    //     jest.spyOn(window, 'alert').mockImplementation(() => {});
    //     fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

    //     expect(window.alert).toHaveBeenCalledWith("Quantity is not selected");
    //   });

    //   it('buys item immediately when Buy Now button is clicked', () => {
    //     fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });
    //     fireEvent.click(screen.getByRole('button', { name: /Buy Now/i }));

    //     expect(mockedBuyNow).toHaveBeenCalledWith({ ...itemMock, Qty: 3 });
    //   });

    //   it('alerts when quantity is not selected on Buy Now', () => {
    //     jest.spyOn(window, 'alert').mockImplementation(() => {});
    //     fireEvent.click(screen.getByRole('button', { name: /Buy Now/i }));

    //     expect(window.alert).toHaveBeenCalledWith("Quantity is not selected");
    //   });
});
