import React from "react";

function Customer() {
  return (
    <div>
      <h1>Customer Information</h1>
      <div>
        <div className="container">
          <div className="contact">
            <form className="form" action="/customer" method="POST">
              <fieldset>
                <div className="contactform">
                  <div className="left">
                    <div className="input-fields">
                      <label for="FirstName">First Name *</label>
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        placeholder="Enter Your First Name "
                        required
                      />
                      <small>Error</small>
                    </div>
                    <div className="input-fields">
                      <label for="LastName">Last Name *</label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        placeholder="Enter Your Last Name "
                        required
                      />
                      <small>Error</small>
                    </div>
                    <div className="input-fields">
                      <label for="PreferredLanguage">Preferred Language</label>
                      <input
                        type="text"
                        name="PreferredLanguage"
                        id="PreferredLanguage"
                        placeholder="Enter Your Preferred Language"
                      />
                    </div>

                    <div className="input-fields">
                      <label for="DateOfBirth">Date of Birth</label>
                      <input type="date" name="DateOfBirth" id="DateOfBirth" />
                    </div>
                  </div>
                  <div className="right">
                    <div className="input-fields">
                      <label for="EmailAddress"> Email Address *</label>
                      <input
                        type="email"
                        name="EmailAddress"
                        id="EmailAddress"
                        placeholder="Enter Your Email Address Here"
                        required
                      />
                      <small>Error</small>
                    </div>

                    <div className="input-fields">
                      <label for="PhoneNumber"> Phone Number *</label>
                      <input
                        type="tel"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        placeholder="Enter Your Phone Number"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                        required
                      />
                      <small>Error</small>
                    </div>

                    <div className="input-fields">
                      <label for="MembershipStatus">Membership Status</label>
                      <input
                        type="text"
                        name="MembershipStatus"
                        id="MembershipStatus"
                        value="Active"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div className="input-fields btns">
                  <input
                    className="submit button"
                    type="submit"
                    value="ADD CUSTOMER"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
