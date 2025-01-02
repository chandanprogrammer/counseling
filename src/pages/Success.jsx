import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <div class="container thankyou-section">
        <h2>Thank You for Regestration</h2>
        <p>
          Your Regestration Form has been submitted successfully. We will
          contact you soon.
        </p>

        <button class="button is-primary btn-link">
          <Link to="/show-list">Registered students List Show </Link>
        </button>
      </div>
    </>
  );
};

export default Success;
