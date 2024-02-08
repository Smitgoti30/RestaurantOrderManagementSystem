import React from "react";

function Customer() {
  return (
    <div>
      <h1>Customer Information</h1>
      <div>
        <div class="container">
          <div class="contact">
            <form class="form" action="/customer" method="POST">
              <fieldset>
                <div class="contactform">
                  <div class="left">
                    <div class="input-fields">
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
                    <div class="input-fields">
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
                    <div class="input-fields">
                      <label for="PreferredLanguage">Preferred Language</label>
                      <input
                        type="text"
                        name="PreferredLanguage"
                        id="PreferredLanguage"
                        placeholder="Enter Your Preferred Language"
                      />
                    </div>

                    <div class="input-fields">
                      <label for="DateOfBirth">Date of Birth</label>
                      <input type="date" name="DateOfBirth" id="DateOfBirth" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="input-fields">
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

                    <div class="input-fields">
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

                    <div class="input-fields">
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
                <div class="input-fields btns">
                  <input
                    class="submit button"
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
