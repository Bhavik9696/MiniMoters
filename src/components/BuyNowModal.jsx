import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const BuyNowModal = ({ product, onClose }) => {
  if (!product) return null;

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load previous orders from localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const saveOrder = (order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const sendEmail = () => {
    if (!customerName || !address || (!payOnDelivery && !transactionId)) {
      alert("Please fill all required fields.");
      return;
    }

    const orderData = {
      name: customerName,
      address,
      product: product.name,
      price: product.price,
      paymentMethod: payOnDelivery ? "Pay on Delivery" : "Online Payment",
      transactionId: payOnDelivery ? "N/A" : transactionId,
      time: new Date().toLocaleString(),
    };

    // Save order to localStorage
    saveOrder(orderData);

    // Send email
    emailjs
      .send(
        "service_gqf33td",
        "template_hd4t06r",
        orderData,
        "guL8NRcJ-CyAwvUZL"
      )
      .then(() => {
        alert("Order placed successfully!");
        setCustomerName("");
        setAddress("");
        setTransactionId("");
        setPayOnDelivery(false);
        onClose();
      })
      .catch(() => alert("Failed to send email. Please try again."));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">Price: ₹{product.price}</p>

        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />

        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={payOnDelivery}
              onChange={(e) => setPayOnDelivery(e.target.checked)}
              className="mr-2"
            />
            Pay on Delivery
          </label>
        </div>

        {!payOnDelivery && (
          <>
            <img
              src="/qr-code.png"
              alt="QR Code"
              className="w-32 mx-auto mb-2"
            />
            <input
              type="text"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
            />
          </>
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2"
          onClick={sendEmail}
        >
          Submit Order
        </button>

        <button
          className="text-sm text-gray-500 underline w-full text-center"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyNowModal;
