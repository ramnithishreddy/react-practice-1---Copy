import React from 'react';


const Contact = () => {
  return (
    <div className="container">
      <div className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 contact-form">
              <h5>SEND US A MESSAGE</h5>
              <p>Please send us your details by filling out the form below, we will quickly get back to you.</p>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <input type="tel" className="form-control" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <textarea className="form-control" placeholder="Message" />
                </div>
                <button type="submit" className="btn btn-primary">SUBMIT</button>
              </form>
            </div>
            <div className="col-md-6 contact-details">
              <div className="contact-inside">
                <div className="location-img">
                  {/* <img src="images/address.png" alt="address" title="address" /> */}
                </div>
                <div className="location-img">
                  <p>Plot No.26&27, Door No. 7-66/2/26 & 27, 4th Floor,</p>
                  <p>Prashanth Hills, Khajaguda Road, Hyderabad - 500008</p>
                </div>
              </div>
              <div className="contact-inside">
                <div className="info-contact">
                  {/* <img src="images/contact.png" alt="contact" title="contact" /> */}
                  <span>+91 6304819271</span>
                </div>
                <div className="info-contact">
                  {/* <img src="images/email.png" alt="email" title="email" /> */}
                  <span>info@resourceone.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
