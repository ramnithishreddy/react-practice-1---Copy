import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userAccount.css";

const UserAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userId = sessionStorage.getItem("userId");
    const userEmail = sessionStorage.getItem("userEmail");

    if (!userId || !userEmail) {
      navigate("/signin");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
    const user = allUsers[userEmail];

    if (user) {
      setUserData(user);
      setEditData(user.profile);
    }
    setLoading(false);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    const userEmail = sessionStorage.getItem("userEmail");
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");

    if (allUsers[userEmail]) {
      allUsers[userEmail].profile = editData;
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      setUserData((prev) => ({ ...prev, profile: editData }));
      setEditMode(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddPayment = () => {
    const userEmail = sessionStorage.getItem("userEmail");
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");

    if (allUsers[userEmail]) {
      const newCard = {
        id: `CARD_${Date.now()}`,
        cardType: "Visa",
        cardNumber: "",
        expiryDate: "",
        cardholderName: "",
        isDefault: false,
      };
      allUsers[userEmail].paymentDetails.push(newCard);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      setUserData((prev) => ({
        ...prev,
        paymentDetails: [...prev.paymentDetails, newCard],
      }));
      setMessage("Payment method added!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddAddress = () => {
    const userEmail = sessionStorage.getItem("userEmail");
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");

    if (allUsers[userEmail]) {
      const newAddress = {
        id: `ADDR_${Date.now()}`,
        type: "shipping",
        name: userData.profile.firstName + " " + userData.profile.lastName,
        phone: userData.profile.phone,
        street: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false,
      };
      allUsers[userEmail].addresses.push(newAddress);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      setUserData((prev) => ({
        ...prev,
        addresses: [...prev.addresses, newAddress],
      }));
      setMessage("Address added!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  if (loading) {
    return <div className="user-account loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="user-account error">User data not found</div>;
  }

  return (
    <div className="user-account">
      <div className="account-container">
        <div className="account-header">
          <h1>Your Account</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        <div className="account-tabs">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`tab-btn ${activeTab === "addresses" ? "active" : ""}`}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
          <button
            className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Methods
          </button>
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>

        <div className="account-content">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="tab-content">
              <h2>Profile Information</h2>

              {!editMode ? (
                <div className="profile-view">
                  <div className="profile-field">
                    <label>Full Name</label>
                    <p>{userData.fullName}</p>
                  </div>
                  <div className="profile-field">
                    <label>Email Address</label>
                    <p>{userData.email}</p>
                  </div>
                  <div className="profile-field">
                    <label>Mobile Number</label>
                    <p>{userData.phone || "Not provided"}</p>
                  </div>
                  <div className="profile-field">
                    <label>Address</label>
                    <p>
                      {userData.profile.address ||
                        "Not provided"}
                    </p>
                  </div>
                  <div className="profile-field">
                    <label>City</label>
                    <p>{userData.profile.city || "Not provided"}</p>
                  </div>
                  <div className="profile-field">
                    <label>State</label>
                    <p>{userData.profile.state || "Not provided"}</p>
                  </div>
                  <div className="profile-field">
                    <label>Zip Code</label>
                    <p>{userData.profile.zipCode || "Not provided"}</p>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="profile-edit">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editData.firstName + " " + editData.lastName}
                      onChange={(e) => {
                        const names = e.target.value.split(" ");
                        setEditData((prev) => ({
                          ...prev,
                          firstName: names[0],
                          lastName: names.slice(1).join(" "),
                        }));
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleEditChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) =>
                        handleEditChange("address", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={editData.city}
                      onChange={(e) =>
                        handleEditChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={editData.state}
                      onChange={(e) =>
                        handleEditChange("state", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      value={editData.zipCode}
                      onChange={(e) =>
                        handleEditChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                  <div className="button-group">
                    <button
                      className="save-btn"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setEditMode(false);
                        setEditData(userData.profile);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="tab-content">
              <h2>Saved Addresses</h2>
              {userData.addresses && userData.addresses.length > 0 ? (
                <div className="items-list">
                  {userData.addresses.map((addr) => (
                    <div key={addr.id} className="item-card">
                      <div className="item-header">
                        <h3>{addr.name}</h3>
                        {addr.isDefault && (
                          <span className="default-badge">Default</span>
                        )}
                      </div>
                      <p>{addr.street}</p>
                      <p>
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                      <p>Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No saved addresses</p>
              )}
              <button className="add-btn" onClick={handleAddAddress}>
                + Add New Address
              </button>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <div className="tab-content">
              <h2>Payment Methods</h2>
              {userData.paymentDetails &&
              userData.paymentDetails.length > 0 ? (
                <div className="items-list">
                  {userData.paymentDetails.map((card) => (
                    <div key={card.id} className="item-card">
                      <div className="item-header">
                        <h3>{card.cardType} Card</h3>
                        {card.isDefault && (
                          <span className="default-badge">Default</span>
                        )}
                      </div>
                      <p>Card Number: {card.cardNumber || "Not provided"}</p>
                      <p>Expiry: {card.expiryDate || "Not provided"}</p>
                      <p>Cardholder: {card.cardholderName || "Not provided"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No saved payment methods</p>
              )}
              <button className="add-btn" onClick={handleAddPayment}>
                + Add New Payment Method
              </button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>Your Orders</h2>
              {userData.orders && userData.orders.length > 0 ? (
                <div className="items-list">
                  {userData.orders.map((order) => (
                    <div key={order.id} className="item-card">
                      <div className="item-header">
                        <h3>Order #{order.id}</h3>
                        <span className={`status ${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      <p>Total: ${order.total}</p>
                      <p>Items: {order.items}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No orders yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
