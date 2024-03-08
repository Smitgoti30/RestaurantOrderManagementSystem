import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomModal = ({ show, handleClose, data }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const totalPrice = data.price * quantity;

    const handlePlaceOrder = () => {
        console.log("success");
        toast.success('Order placed successfully!');
        console.log("success");
        // handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{data.description}</p>
                <img src={require(`../assets/images/${data.image}`)} alt='img' />
            </Modal.Body>
            <Modal.Footer>
                <div className='item-container'>
                    <div className='btn-qty'>
                        <button className='btn' onClick={handleDecrement}>
                            <span>-</span>
                        </button>
                        <div className='bg-red p-2 text-white'>{quantity}</div>
                        <button className='btn' onClick={handleIncrement} >
                            <span>+</span>
                        </button>
                    </div>
                    <div>
                        <Button className='btn-red' onClick={() => handlePlaceOrder()}>
                            Total Price - ${totalPrice}
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;